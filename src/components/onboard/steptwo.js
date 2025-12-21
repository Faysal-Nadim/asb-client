import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { greenTick, redCross } from "../../assets/SvgIcons";

/**
 * @author
 * @function StepTwo
 **/

export const StepTwo = ({ setSteps, name, setName }) => {
  const navigate = useNavigate();

  const [nameErrorOne, setNameErrorOne] = React.useState(true);
  const [nameErrorTwo, setNameErrorTwo] = React.useState(true);

  const handleSaveAndContinue = () => {
    if (nameErrorOne || nameErrorTwo) return;
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === 1
          ? { ...step, status: "done" }
          : index === 2
          ? { ...step, status: "current" }
          : step
      )
    );
    navigate("/merchant/onboarding?step=2");
  };

  useEffect(() => {
    if (!name) {
      setNameErrorOne(true);
      setNameErrorTwo(true);
      return;
    }

    // Only A–Z and a–z allowed
    const validPattern = /^[A-Za-z]+$/;

    const hasInvalidChars = !validPattern.test(name);
    const invalidLength = name.length < 4 || name.length > 20;

    setNameErrorOne(hasInvalidChars);
    setNameErrorTwo(invalidLength);
  }, [name]);

  return (
    <div className="p-8 max-w-[1380px] mx-auto">
      <div className="text-center w-3/6 mx-auto mb-8">
        <h2 className="text-2xl font-semibold ">Name your shop</h2>
        <p className="text-gray-700 mx-auto mt-4">
          Start with any name. You can rename your shop whenever you like.
          Product themes, personal style, and brand story are great places to
          start.
        </p>
      </div>

      <div className="w-3/6 mx-auto">
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          placeholder="Enter your shop name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mt-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            {nameErrorTwo ? redCross : greenTick}
            Between 4-20 characters
          </p>
          <p className="flex items-center gap-2">
            {nameErrorOne ? redCross : greenTick}
            No special characters, spaces, or accented letters
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveAndContinue}
          className="rounded-full bg-black py-3 px-6 hover:shadow-lg hover:shadow-black/40 disabled:opacity-50 mt-8"
          disabled={nameErrorOne || nameErrorTwo || !name}
        >
          <p className="text-md font-semibold text-white">Save & continue</p>
        </button>
      </div>
    </div>
  );
};
