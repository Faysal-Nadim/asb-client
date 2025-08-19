// ShopSetupStepper.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const defaultSteps = [
  { label: "Shop preferences", status: "current" },
  { label: "Name your shop", status: "upcoming" },
  { label: "Billing and Payment", status: "upcoming" },
  { label: "Agreement", status: "upcoming" },
];

export default function ShopSetupStepper({
  steps = defaultSteps,
  setSteps,
  currentStep,
}) {
  // index of last step that's not "upcoming"
  const lastActiveIdx = steps.reduce(
    (acc, s, i) => (s.status !== "upcoming" ? i : acc),
    -1
  );

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
  const pct =
    steps.length > 1
      ? clamp((lastActiveIdx / (steps.length - 1)) * 100, 0, 100)
      : 0;

  const handleSteps = (i) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        i === currentStep && index === currentStep
          ? { ...step, status: "current" }
          : index === currentStep
          ? { ...step, status: "done" }
          : index === i
          ? { ...step, status: "current" }
          : step
      )
    );
  };

  useEffect(() => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === currentStep
          ? { ...step, status: "current" }
          : step.status === "done"
          ? { ...step, status: "done" }
          : step.status === "current"
          ? { ...step, status: "done" }
          : step
      )
    );
  }, [currentStep, setSteps]);

  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-5xl">
        {/* Track */}
        <div className="absolute left-0 right-0 top-4 h-[2px] bg-gray-200" />

        {/* Progress */}
        <div
          className="absolute left-0 top-4 h-[2px] bg-gray-900 transition-all"
          style={{ width: `${pct}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className="flex w-1/5 flex-col items-center text-center"
            >
              {/* Dot */}
              {step.status === "done" ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 bg-white">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="h-4 w-4 fill-none stroke-gray-900 stroke-[3]"
                  >
                    <path d="M5 10l3 3 7-7" />
                  </svg>
                </span>
              ) : step.status === "current" ? (
                <span className="h-8 w-8 rounded-full bg-gray-900" />
              ) : (
                <span className="h-8 w-8 rounded-full border-2 border-gray-300 bg-white" />
              )}

              {/* Label */}
              {step.status !== "upcoming" ? (
                <Link
                  to={`/merchant/onboarding?step=${index}`}
                  className="mt-2 text-sm text-gray-700 underline"
                  onClick={() => handleSteps(index)}
                >
                  {step.label}
                </Link>
              ) : (
                <span className="mt-2 text-sm text-gray-700">{step.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
