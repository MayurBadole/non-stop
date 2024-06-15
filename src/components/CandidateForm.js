import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CandidateContext } from "../context/CandidateContext";
import Step1 from "../stepComponents/Step1";
import Step2 from "../stepComponents/Step2";
import Step3 from "../stepComponents/Step3";
import Step4 from "../stepComponents/Step4";
import CustomStepper from "../stepComponents/CustomStepper";

import "../styles/CandidateForm.css";
import { getCandidateById } from "../services/candidateService";

const CandidateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    addCandidate,
    editCandidate,
    selectedCandidate,
    setSelectedCandidate,
  } = useContext(CandidateContext);
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await getCandidateById(id);
        setSelectedCandidate(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch candidate details , Please try again");
      }
    };
    if (id) {
      fetchCandidate();
    }
    // eslint-disable-next-line
  }, [id]);
  const initialCandidateState = {
    profile_picture: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    gender: "",
    hobbies: [],
    education: [
      { institute: "", degree: "", percentage: "", pass_out_year: "" },
    ],
    skills: [{ name: "", experience: "" }],
    experience: [
      {
        company: "",
        project: "",
        role: "",
        team_size: "",
        duration_from: "",
        duration_to: "",
      },
    ],
  };

  const [candidate, setCandidate] = useState(initialCandidateState);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!id) {
      setCandidate(initialCandidateState);
    } else if (selectedCandidate) {
      setCandidate(selectedCandidate);
    } // eslint-disable-next-line
  }, [id, selectedCandidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleArrayChange = (e, index, field, arrayName) => {
    const { value } = e.target;
    const newArray = [...candidate[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setCandidate({ ...candidate, [arrayName]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editCandidate(id, candidate);
    } else {
      await addCandidate(candidate);
    }
    navigate("/home");
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const steps = [
    <Step1 candidate={candidate} handleChange={handleChange} />,
    <Step2 candidate={candidate} handleArrayChange={handleArrayChange} />,
    <Step3 candidate={candidate} handleArrayChange={handleArrayChange} />,
    <Step4 candidate={candidate} handleArrayChange={handleArrayChange} />,
  ];

  return !errorMessage ? (
    <div className="candidate-form">
      <h2>{id ? "Edit Candidate" : "Add Candidate"}</h2>
      <CustomStepper currentStep={currentStep} goToStep={goToStep} />
      <form onSubmit={handleSubmit}>
        {steps[currentStep - 1]}
        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep}>
              Back
            </button>
          )}
          {currentStep < steps.length && (
            <button type="button" onClick={nextStep}>
              Next
            </button>
          )}
          {currentStep === steps.length && <button type="submit">Save</button>}
        </div>
      </form>
    </div>
  ) : (
    <div className="error-msg">{errorMessage}</div>
  );
};

export default CandidateForm;
