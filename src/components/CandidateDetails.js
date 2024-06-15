import React, { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../context/CandidateContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CandidateDetails.css";
import ConfirmationModal from "./ConfirmationModal";
import { getCandidateById } from "../services/candidateService";

const CandidateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { selectedCandidate, setSelectedCandidate, removeCandidate } =
    useContext(CandidateContext);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await getCandidateById(id);
        setSelectedCandidate(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch candidate details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id, setSelectedCandidate]);

  const handleDelete = async () => {
    try {
      await removeCandidate(id);
      alert("Candidate data deleted successfully.");
      navigate("/home");
    } catch (error) {
      alert("Failed to delete candidate data. Please try again.");
    }
  };

  const handleEdit = () => {
    navigate(`/home/candidate/edit/${selectedCandidate.id}`);
  };

  if (loading) {
    return (
      <div className="loading-contianer">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="candidate-details">
      {selectedCandidate ? (
        <>
          <img src={selectedCandidate.profile_picture} alt="Profile" />
          <h2>{selectedCandidate.name}</h2>
          <p>Phone: {selectedCandidate.phone}</p>
          <p>Email: {selectedCandidate.email}</p>
          <p>Gender: {selectedCandidate.gender}</p>
          <p>Address: {selectedCandidate.address}</p>
          <p>Hobbies: {selectedCandidate.hobbies.join(", ")}</p>

          <h3>Education</h3>
          <ul>
            {selectedCandidate.education.map((edu, index) => (
              <li key={index}>
                <p>Institute: {edu.institute}</p>
                <p>Degree: {edu.degree}</p>
                <p>Percentage: {edu.percentage}%</p>
                <p>Pass Out Year: {edu.pass_out_year}</p>
              </li>
            ))}
          </ul>

          <h3>Skills</h3>
          <ul>
            {selectedCandidate.skills.map((skill, index) => (
              <li key={index}>
                <p>Name: {skill.name}</p>
                <p>Experience: {skill.experience} years</p>
              </li>
            ))}
          </ul>

          <h3>Experience</h3>
          <ul>
            {selectedCandidate.experience.map((exp, index) => (
              <li key={index}>
                <p>Company: {exp.company}</p>
                <p>Project: {exp.project}</p>
                <p>Role: {exp.role}</p>
                <p>Team Size: {exp.team_size}</p>
                <p>
                  Duration: {exp.duration_from} to {exp.duration_to}
                </p>
              </li>
            ))}
          </ul>

          <button onClick={() => handleEdit()}>Edit</button>
          <button onClick={() => setShowModal(true)}>Delete</button>

          <ConfirmationModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleDelete}
          />
        </>
      ) : (
        <div className="loading-contianer">
          <div className="error-msg">{errorMessage}</div>
        </div>
      )}
    </div>
  );
};

export default CandidateDetails;
