import React, { useContext, useState } from "react";
import { CandidateContext } from "../context/CandidateContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CandidateDetails.css";
import ConfirmationModal from "./ConfirmationModal";

const CandidateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { selectedCandidate, removeCandidate } = useContext(CandidateContext);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await removeCandidate(id);
    navigate("/home");
  };

  const handleEdit = () => {
    navigate(`/home/candidate/edit/${selectedCandidate.id}`);
  };
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
        <p>No candidate selected</p>
      )}
    </div>
  );
};

export default CandidateDetails;
