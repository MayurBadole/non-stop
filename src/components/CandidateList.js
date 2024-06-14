import React, { useContext } from "react";
import { CandidateContext } from "../context/CandidateContext";
import { Link } from "react-router-dom";
import "../styles/CandidateList.css";

const CandidateList = () => {
  const { candidates } = useContext(CandidateContext);
  return (
    <div className="candidate-list">
      <h2>Candidate List</h2>
      <Link to="candidate/new" className="add-candidate">
        Add Candidate
      </Link>
      <ul>
        {candidates.map((candidate) => (
          <div key={candidate.id}>
            <div className="profile">
              <img
                src={candidate.profile_picture}
                alt={candidate.name}
                className="profile-img"
              />
              <Link to={`candidate/${candidate.id}`}>{candidate.name}</Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
