import React, { useEffect, useState } from "react";
import ShopSetupStepper from "../components/onboard/stepCounter";
import { StepOne } from "../components/onboard/stepone";
import { useLocation } from "react-router-dom";
import { StepTwo } from "../components/onboard/steptwo";
import { StepThree } from "../components/onboard/stepthree";
/**
 * @author
 * @function Onboarding
 **/

export const Onboarding = (props) => {
  const [steps, setSteps] = useState([
    { label: "Shop preferences", status: "current" },
    { label: "Name your shop", status: "upcoming" },
    { label: "Billing and Payment", status: "upcoming" },
    { label: "Agreement", status: "upcoming" },
  ]);

  const [currentStep, setCurrentStep] = useState(0);

  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const step = params.get("step");
    if (step) {
      setCurrentStep(parseInt(step));
    }
  }, [search]);

  return (
    <div className="w-full bg-primary">
      <div className="p-8 max-w-[1380px] mx-auto">
        <ShopSetupStepper
          steps={steps}
          setSteps={setSteps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
      <div className="border-b border-1 border-grey w-full" />

      {currentStep === 0 && <StepOne setSteps={setSteps} />}

      {currentStep === 1 && <StepTwo setSteps={setSteps} />}

      {currentStep === 2 && <StepThree setSteps={setSteps} />}
    </div>
  );
};
