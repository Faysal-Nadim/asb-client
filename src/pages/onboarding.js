import React, { useCallback, useEffect, useMemo, useState } from "react";
import ShopSetupStepper from "../components/onboard/stepCounter";
import { StepOne } from "../components/onboard/stepone";
import { useLocation } from "react-router-dom";
import { StepTwo } from "../components/onboard/steptwo";
import { StepThree } from "../components/onboard/stepthree";
import { StepFour } from "../components/onboard/stepfour";
import { StepFive } from "../components/onboard/stepfive";
/**
 * @author
 * @function Onboarding
 **/

const shopOwnerInfo = {
  firstName: "",
  lastName: "",
  dob: "",
  country: "",
  street: "",
  city: "",
  zip: "",
  dialCode: "",
  phone: "",
};

const shopLegalInfo = {
  legalName: "",
  registrationNo: "",
  taxId: "",
  vatId: "",
  consented: true,
  country: "",
  street: "",
  city: "",
  zip: "",
  dialCode: "",
  phone: "",
};

const shopPaymentInfo = {
  accountHolder: "",
  bankName: "",
  accountNumber: "",
  swiftCode: "",
  branch: "",
  routingNumber: "",
  sortcode: "",
  iban: "",
};

export const Onboarding = (props) => {
  const [steps, setSteps] = useState([
    { label: "Shop preferences", status: "current" },
    { label: "Name your shop", status: "upcoming" },
    { label: "Billing and Payment", status: "upcoming" },
    { label: "Verification", status: "upcoming" },
    { label: "Agreement", status: "upcoming" },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [shopLang, setShopLang] = React.useState("en");
  const [shopCountry, setShopCountry] = React.useState("BD");
  const [shopCurr, setShopCurr] = React.useState("BDT");
  const [name, setName] = React.useState("");
  const [shopType, setShopType] = React.useState("SOLE_PROPRIETOR");

  const [ownerFormData, setOwnerFormData] = React.useState(shopOwnerInfo);
  const [legalFormData, setLegalFormData] = React.useState(shopLegalInfo);
  const [paymentFormData, setPaymentFormData] = React.useState(shopPaymentInfo);

  const setOwnerField = useCallback((key, value) => {
    setOwnerFormData((prev) => {
      // optional guard to prevent pointless updates
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);

  const setLegalField = useCallback((key, value) => {
    setLegalFormData((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);

  const setPaymentField = useCallback((key, value) => {
    setPaymentFormData((prev) => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);

  const ownerFormHandler = useMemo(
    () => ({ ownerFormData, setOwnerField, setOwnerFormData }),
    [ownerFormData, setOwnerField]
  );

  const legalFormHandler = useMemo(
    () => ({ legalFormData, setLegalField, setLegalFormData }),
    [legalFormData, setLegalField]
  );

  const paymentFormHandler = useMemo(
    () => ({ paymentFormData, setPaymentField, setPaymentFormData }),
    [paymentFormData, setPaymentField]
  );

  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const step = params.get("step");
    if (step) {
      setCurrentStep(parseInt(step));
    }
  }, [search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      {currentStep === 0 && (
        <StepOne
          setSteps={setSteps}
          shopLang={shopLang}
          setShopLang={setShopLang}
          shopCountry={shopCountry}
          setShopCountry={setShopCountry}
          shopCurr={shopCurr}
          setShopCurr={setShopCurr}
        />
      )}

      {currentStep === 1 && (
        <StepTwo setSteps={setSteps} name={name} setName={setName} />
      )}

      {currentStep === 2 && (
        <StepThree
          setSteps={setSteps}
          {...ownerFormHandler}
          {...legalFormHandler}
          {...paymentFormHandler}
          shopType={shopType}
          setShopType={setShopType}
        />
      )}

      {currentStep === 3 && <StepFour setSteps={setSteps} />}

      {currentStep === 4 && <StepFive setSteps={setSteps} />}
    </div>
  );
};
