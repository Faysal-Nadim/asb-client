import React from "react";

const BasicTextInput = ({
  label,
  tooltip,
  value,
  onChange,
  placeholder,
  id,
  name,
  type,
  isRequired,
  disabled,
  maxWidth,
}) => {
  return (
    <div
      style={{ maxWidth: maxWidth }}
      className="flex flex-col space-y-1 mb-4"
    >
      <label htmlFor={name} className="text-gray-700 font-medium text-md">
        {label}
        {isRequired && <span className="text-md text-red-500">*</span>}
      </label>
      <input
        type={type || "text"}
        id={id}
        name={name}
        placeholder={placeholder || ""}
        onChange={onChange}
        value={value}
        className="text-sm border border-gray-300 rounded-lg p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        aria-describedby="tooltip"
        disabled={disabled}
      />
      {tooltip && (
        <p id="tooltip" className="text-xs text-gray-500">
          {tooltip}
        </p>
      )}
    </div>
  );
};

export { BasicTextInput };
