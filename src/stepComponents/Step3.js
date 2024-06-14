const Step3 = ({ candidate, setCandidate, handleArrayChange }) => {
  const removeSkill = (index) => {
    const newArray = candidate.skills.filter((_, i) => i !== index);
    setCandidate({ ...candidate, skills: newArray });
  };

  const addSkill = () => {
    setCandidate({
      ...candidate,
      skills: [...candidate.skills, { name: "", experience: "" }],
    });
  };
  return (
    <div>
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
    </div>
  );
};

export default Step3;
