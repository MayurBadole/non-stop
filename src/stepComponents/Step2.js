const Step2 = ({ candidate, setCandidate, handleArrayChange }) => {
  const removeEducation = (index) => {
    const newArray = candidate.education.filter((_, i) => i !== index);
    setCandidate({ ...candidate, education: newArray });
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
  return (
    <div>
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
    </div>
  );
};

export default Step2;
