const Step4 = ({ candidate, handleArrayChange, setCandidate }) => {
  const removeExperience = (index) => {
    const newArray = candidate.experience.filter((_, i) => i !== index);
    setCandidate({ ...candidate, experience: newArray });
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
  return (
    <div>
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
    </div>
  );
};

export default Step4;
