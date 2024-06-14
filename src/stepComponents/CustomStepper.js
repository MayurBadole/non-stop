import React from "react";
import "../styles/CustomStepper.css";
const CustomStepper = ({ currentStep, goToStep }) => {
  const steps = ["Personal", "Education", "Skills", "Experience"];

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${currentStep === index + 1 ? "active" : ""}`}
          onClick={() => goToStep(index + 1)}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-title">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomStepper;
