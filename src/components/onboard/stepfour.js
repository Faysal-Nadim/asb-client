// components/DocumentVerification.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_MB = 5;
const ACCEPT_IMG = ["image/jpeg", "image/png", "image/webp"];
const bytes = (mb) => mb * 1024 * 1024;

function FileDrop({
  label,
  hint,
  accept = ACCEPT_IMG,
  maxSize = bytes(MAX_MB),
  value,
  onChange,
  required,
  square = false,
}) {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");

  const onFiles = (files) => {
    const file = files?.[0];
    if (!file) return;
    if (!accept.includes(file.type)) {
      setError("Unsupported format. Use JPG, PNG or WEBP.");
      onChange?.(null);
      return;
    }
    if (file.size > maxSize) {
      setError(`File too large. Max ${MAX_MB}MB.`);
      onChange?.(null);
      return;
    }
    setError("");
    onChange?.(file);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-800 mb-1">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          onFiles(e.dataTransfer.files);
        }}
        className={[
          "relative border-2 border-dashed rounded-xl p-4 bg-white transition",
          drag
            ? "border-[#2F5651]/70 bg-[#2F5651]/5"
            : "border-gray-300 hover:border-gray-400",
        ].join(" ")}
      >
        <input
          type="file"
          accept={accept.join(",")}
          className="absolute inset-0 opacity-0 cursor-pointer"
          aria-label={label}
          onChange={(e) => onFiles(e.target.files)}
        />

        {value ? (
          <div className="flex items-center gap-3">
            <div
              className={`overflow-hidden rounded-lg border bg-gray-50 ${
                square ? "w-24 h-24" : "w-36 h-24"
              }`}
            >
              <img
                src={URL.createObjectURL(value)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-800">{value.name}</p>
              <p className="text-gray-500">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button
                type="button"
                onClick={() => onChange(null)}
                className="mt-1 inline-flex text-[#2F5651] hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-600">
            <div className="mx-auto mb-2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                />
              </svg>
            </div>
            <p>
              <span className="font-medium text-gray-800">Click to upload</span>{" "}
              or drag & drop
            </p>
            <p className="text-xs mt-1">JPG, PNG, WEBP — up to {MAX_MB}MB</p>
            {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  );
}

export const StepFour = ({ onSubmit, setSteps }) => {
  const navigate = useNavigate();

  const [nidNumber, setNidNumber] = useState("");
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [agree, setAgree] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!nidNumber.trim()) e.nid = "NID number is required.";
    if (!nidFront) e.front = "Front image is required.";
    if (!selfie) e.selfie = "Selfie/portrait is required.";
    return e;
  }, [nidNumber, nidFront, selfie]);

  const valid = Object.keys(errors).length === 0 && agree;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const payload = {
      nidNumber,
      files: { nidFront, nidBack, selfie },
    };
    onSubmit?.(payload);
    // Example: call your API with FormData
    // const fd = new FormData();
    // fd.append("nidNumber", nidNumber);
    // fd.append("nidFront", nidFront);
    // if (nidBack) fd.append("nidBack", nidBack);
    // fd.append("selfie", selfie);
    // await fetch("/api/verification", { method: "POST", body: fd });
  };

  const handleSaveAndContinue = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === 3
          ? { ...step, status: "done" }
          : index === 4
          ? { ...step, status: "current" }
          : step
      )
    );
    navigate("/merchant/onboarding?step=4");
  };

  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          Verify your identity
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Upload your National ID (NID) and a clear face photo. We use this only
          to verify your account.
        </p>
      </header>

      {/* NID number */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          NID number <span className="text-rose-600">*</span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter your NID number"
          value={nidNumber}
          onChange={(e) => setNidNumber(e.target.value)}
          className={`w-full rounded-lg border px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 ${
            errors.nid ? "border-rose-500" : "border-gray-300"
          }`}
        />
        {errors.nid && (
          <p className="mt-2 text-sm text-rose-600">{errors.nid}</p>
        )}
      </div>

      {/* NID images */}
      <div className="grid md:grid-cols-2 gap-6">
        <FileDrop
          label="NID front side"
          required
          hint="Make sure all text is readable and edges are visible."
          value={nidFront}
          onChange={setNidFront}
        />
        <FileDrop
          label="NID back side (optional)"
          hint="Upload if your NID has text on the back."
          value={nidBack}
          onChange={setNidBack}
        />
      </div>

      {/* Selfie */}
      <FileDrop
        label="Your photo / selfie"
        required
        hint="Good lighting, no sunglasses or mask. Match your NID photo."
        value={selfie}
        onChange={setSelfie}
        square
      />
      {errors.front && <p className="text-sm text-rose-600">{errors.front}</p>}
      {errors.selfie && (
        <p className="text-sm text-rose-600">{errors.selfie}</p>
      )}

      {/* Tips */}
      <div className="rounded-xl border border-gray-200 p-4 bg-white">
        <h3 className="font-medium text-gray-900 mb-2">Photo tips</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Use original, unedited photos (no filters/cropping).</li>
          <li>All four corners of the NID should be visible and text sharp.</li>
          <li>Face the camera; remove hats, sunglasses, and masks.</li>
        </ul>
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-gray-400 text-black focus:ring-black"
        />
        <p className="text-sm text-gray-700">
          I confirm that the documents provided are my own and I authorize
          Aleeha to use them for identity verification according to the{" "}
          <a className="underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </label>

      {/* Security note */}
      <p className="text-xs text-gray-500">
        Your uploads are encrypted in transit and at rest. We delete
        verification data after processing when allowed by law.
      </p>

      {/* Actions */}
      {/* <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!valid}
          className={`h-11 px-5 rounded-full text-white font-semibold transition ${
            valid
              ? "bg-[#2F5651] hover:opacity-90"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit for review
        </button>
        <button
          type="button"
          className="h-11 px-5 rounded-full border border-gray-300 hover:bg-gray-50"
        >
          Save draft
        </button>
      </div> */}

      <div className="flex justify-end">
        <div
          disabled={!valid}
          className={`rounded-full bg-black py-3 px-6 ${
            valid
              ? "bg-[#2F5651] hover:opacity-90 hover:shadow-lg hover:shadow-black/40 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSaveAndContinue}
        >
          <p className="text-md font-semibold text-white">Save & continue</p>
        </div>
      </div>
    </form>
  );
};
