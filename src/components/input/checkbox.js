import { useState } from "react";

export default function ComplianceCheckbox({ checked, onChange }) {
  const [local, setLocal] = useState(checked ?? false);

  const toggle = () => {
    const next = !local;
    setLocal(next);
    onChange?.(next);
  };

  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      {/* Custom checkbox */}
      <input
        type="checkbox"
        checked={local}
        onChange={toggle}
        className="peer mt-0.5 h-5 w-5 shrink-0 appearance-none rounded border border-gray-400
                   checked:border-black checked:bg-black
                   focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/30"
        aria-describedby="compliance-text"
      />
      {/* Checkmark (drawn when checked) */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute ml-0.5 mt-[3px] h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
      >
        <path
          fill="currentColor"
          d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
        />
      </svg>

      {/* Label text */}
      <p id="compliance-text" className="text-sm text-gray-800 leading-6">
        <span className="font-semibold">
          I confirm that the items I sell on Aleeha are in line with all local
          laws that apply to my business.
        </span>{" "}
        <span className="text-gray-700">
          Since Aleeha is a global marketplace, your items have to be in line
          with local laws wherever you sell or dispatch.
        </span>
      </p>
    </label>
  );
}
