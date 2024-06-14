const Step1 = ({ candidate, handleChange }) => (
  <div>
    <label>
      Profile Picture Link:
      <input type="text" onChange={handleChange} />
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
      <select name="gender" value={candidate.gender} onChange={handleChange}>
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
          handleChange({
            target: { name: "hobbies", value: e.target.value.split(",") },
          })
        }
      />
    </label>
  </div>
);

export default Step1;
