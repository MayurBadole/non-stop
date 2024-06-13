import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CandidateContext } from "../context/CandidateContext";

import "../styles/CandidateForm.css";

const CandidateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCandidate, editCandidate, selectedCandidate } =
    useContext(CandidateContext);
  const [candidate, setCandidate] = useState({
    profile_picture: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    gender: "",
    hobbies: [],
    education: [],
    skills: [],
    experience: [],
  });

  useEffect(() => {
    if (selectedCandidate) {
      setCandidate(selectedCandidate);
    }
  }, [selectedCandidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCandidate({ ...candidate, profile_picture: file });
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

  const addEducation = () => {
    setCandidate({
      ...candidate,
      education: [
        ...candidate.education,
        { institute: "", degree: "", percentage: "", pass_out_year: "" },
      ],
    });
  };

  const addSkill = () => {
    setCandidate({
      ...candidate,
      skills: [...candidate.skills, { name: "", experience: "" }],
    });
  };

  const addExperience = () => {
    setCandidate({
      ...candidate,
      experience: [
        ...candidate.experience,
        {
          company: "",
          project: "",
          role: "",
          team_size: "",
          duration_from: "",
          duration_to: "",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const newArray = candidate.education.filter((_, i) => i !== index);
    setCandidate({ ...candidate, education: newArray });
  };

  const removeSkill = (index) => {
    const newArray = candidate.skills.filter((_, i) => i !== index);
    setCandidate({ ...candidate, skills: newArray });
  };

  const removeExperience = (index) => {
    const newArray = candidate.experience.filter((_, i) => i !== index);
    setCandidate({ ...candidate, experience: newArray });
  };

  return (
    <div className="candidate-form">
      <h2>{id ? "Edit Candidate" : "Add Candidate"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={candidate.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={candidate.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={candidate.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={candidate.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={candidate.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Hobbies:
          <input
            type="text"
            name="hobbies"
            value={candidate.hobbies.join(",")}
            onChange={(e) =>
              setCandidate({ ...candidate, hobbies: e.target.value.split(",") })
            }
          />
        </label>
        <h3>Education</h3>
        {candidate.education.map((edu, index) => (
          <div key={index}>
            <label>
              Institute:
              <input
                type="text"
                value={edu.institute}
                onChange={(e) =>
                  handleArrayChange(e, index, "institute", "education")
                }
              />
            </label>
            <label>
              Degree:
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  handleArrayChange(e, index, "degree", "education")
                }
              />
            </label>
            <label>
              Percentage:
              <input
                type="number"
                value={edu.percentage}
                onChange={(e) =>
                  handleArrayChange(e, index, "percentage", "education")
                }
              />
            </label>
            <label>
              Pass Out Year:
              <input
                type="number"
                value={edu.pass_out_year}
                onChange={(e) =>
                  handleArrayChange(e, index, "pass_out_year", "education")
                }
              />
            </label>
            <button type="button" onClick={() => removeEducation(index)}>
              Remove Education
            </button>
          </div>
        ))}
        <button type="button" onClick={addEducation}>
          Add Education
        </button>
        <h3>Skills</h3>
        {candidate.skills.map((skill, index) => (
          <div key={index}>
            <label>
              Skill Name:
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleArrayChange(e, index, "name", "skills")}
              />
            </label>
            <label>
              Experience (years):
              <input
                type="number"
                value={skill.experience}
                onChange={(e) =>
                  handleArrayChange(e, index, "experience", "skills")
                }
              />
            </label>
            <button type="button" onClick={() => removeSkill(index)}>
              Remove Skill
            </button>
          </div>
        ))}
        <button type="button" onClick={addSkill}>
          Add Skill
        </button>
        <h3>Experience</h3>
        {candidate.experience.map((exp, index) => (
          <div key={index}>
            <label>
              Company:
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleArrayChange(e, index, "company", "experience")
                }
              />
            </label>
            <label>
              Project:
              <input
                type="text"
                value={exp.project}
                onChange={(e) =>
                  handleArrayChange(e, index, "project", "experience")
                }
              />
            </label>
            <label>
              Role:
              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  handleArrayChange(e, index, "role", "experience")
                }
              />
            </label>
            <label>
              Team Size:
              <input
                type="number"
                value={exp.team_size}
                onChange={(e) =>
                  handleArrayChange(e, index, "team_size", "experience")
                }
              />
            </label>
            <label>
              Duration From:
              <input
                type="text"
                value={exp.duration_from}
                onChange={(e) =>
                  handleArrayChange(e, index, "duration_from", "experience")
                }
              />
            </label>
            <label>
              Duration To:
              <input
                type="text"
                value={exp.duration_to}
                onChange={(e) =>
                  handleArrayChange(e, index, "duration_to", "experience")
                }
              />
            </label>
            <button type="button" onClick={() => removeExperience(index)}>
              Remove Experience
            </button>
          </div>
        ))}
        <button type="button" onClick={addExperience}>
          Add Experience
        </button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CandidateForm;
