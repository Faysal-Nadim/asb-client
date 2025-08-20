import React, { useMemo } from "react";

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
      <label htmlFor={name} className="text-black font-semibold text-md">
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
        className="text-sm bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
const BasicSelectInput = ({
  value,
  onChange,
  label,
  options,
  errorText,
  name,
  defaultDisabledValue,
  isRequired,
  tooltip,
}) => {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      <label htmlFor={name} className="text-black font-semibold text-md">
        {label}
        {isRequired && <span className="text-md text-red-500">*</span>}
      </label>

      <select
        name={name}
        className={
          "text-sm bg-white border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        }
        value={value}
        onChange={onChange}
        aria-describedby="tooltip"
      >
        {/* <option defaultValue={""} className="text-gray-200">
          {defaultDisabledValue ? defaultDisabledValue : "Select"}
        </option> */}

        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <p id="tooltip" className="text-xs text-black">
        {tooltip}
      </p>
    </div>
  );
};

const DOBInput = ({
  label = "Your date of birth",
  required = true,
  value = { day: "", month: "", year: "" },
  onChange = () => {},
  startYear = 1900,
  endYear = new Date().getFullYear(),
  error,
}) => {
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );
  const years = useMemo(() => {
    const ys = [];
    for (let y = endYear; y >= startYear; y--) ys.push(y);
    return ys;
  }, [startYear, endYear]);

  const handle = (k, v) => onChange({ ...value, [k]: v });

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block mb-2 text-black font-semibold text-md">
        {label}
        {required && <span className="text-md text-red-500">*</span>}
      </label>

      {/* Wrapper */}
      <div
        className={`flex rounded-lg border ${
          error
            ? "border-gray-300 ring-2 ring-rose-500 ring-offset-2"
            : "border-gray-300"
        } overflow-hidden`}
      >
        {/* Day */}
        <div className="relative flex-1">
          <select
            className="w-full bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none"
            value={value.day}
            onChange={(e) => handle("day", e.target.value)}
          >
            <option value="">Select day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200 ml-2" />

        {/* Month */}
        <div className="relative flex-1">
          <select
            className="w-full bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none"
            value={value.month}
            onChange={(e) => handle("month", e.target.value)}
          >
            <option value="">Select month</option>
            {months.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, "0")}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200 ml-2" />

        {/* Year */}
        <div className="relative flex-1">
          <select
            className="w-full bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none"
            value={value.year}
            onChange={(e) => handle("year", e.target.value)}
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error text */}
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
};

export { BasicTextInput, BasicSelectInput, DOBInput };
