import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/**
 * @author
 * @function RequestShipment
 **/

const PRODUCT_CATEGORIES = [
  "Electronics",
  "Clothing & Apparel",
  "Shoes & Footwear",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Toys & Games",
  "Sports & Outdoors",
  "Books & Stationery",
  "Jewelry & Accessories",
  "Industrial & Machinery",
  "Food & Grocery",
  "Other",
];

const SOURCE_COUNTRIES = [
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  // { code: "IN", name: "India", flag: "🇮🇳" },
  // { code: "DE", name: "Germany", flag: "🇩🇪" },
  // { code: "JP", name: "Japan", flag: "🇯🇵" },
  // { code: "US", name: "United States", flag: "🇺🇸" },
];

function FileDropZone({ label, hint, accept, icon, onFileChange, file }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${dragging ? "#16a34a" : "#d1d5db"}`,
        borderRadius: 10,
        padding: "20px 16px",
        textAlign: "center",
        cursor: "pointer",
        background: dragging ? "#f0fdf4" : "#fafafa",
        transition: "all 0.2s",
        marginTop: 6,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e.target.files[0])}
      />
      <div style={{ fontSize: 40, marginBottom: 6 }}>{icon}</div>
      {file ? (
        <p
          style={{ margin: 0, fontSize: 13, color: "#16a34a", fontWeight: 500 }}
        >
          {file.name}
        </p>
      ) : (
        <>
          <p style={{ margin: "0 0 2px", fontSize: 13, color: "#374151" }}>
            Drag &amp; drop or{" "}
            <span style={{ color: "#16a34a", fontWeight: 600 }}>
              Choose file
            </span>
          </p>
          <p style={{ margin: 0, fontSize: 11.5, color: "#9ca3af" }}>{hint}</p>
        </>
      )}
    </div>
  );
}

function CartonRow({ carton, index, onChange, onRemove }) {
  const fields = [
    { key: "quantity", label: "Qty", type: "number", placeholder: "0" },
    {
      key: "weight",
      label: "Weight (kg)",
      type: "number",
      placeholder: "0.00",
    },
    { key: "price", label: "Price (USD)", type: "number", placeholder: "0.00" },
    {
      key: "contains",
      label: "Contains",
      type: "text",
      placeholder: "Regular/Battery/Fragile/Liquid",
    },
    {
      key: "hsCode",
      label: "HS Code",
      type: "text",
      placeholder: "e.g. 6404.11",
    },
    { key: "cbm", label: "CBM", type: "number", placeholder: "0.000" },
  ];

  return (
    <div
      style={{
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: "14px 16px",
        marginBottom: 10,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span style={{ fontWeight: 600, fontSize: 13, color: "#374151" }}>
          Package {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          style={{
            background: "none",
            border: "none",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px 12px",
        }}
      >
        {fields.map(({ key, label, type, placeholder }) => (
          <div key={key}>
            <label
              style={{
                display: "block",
                fontSize: 11.5,
                fontWeight: 500,
                color: "#6b7280",
                marginBottom: 3,
              }}
            >
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={carton[key] || ""}
              onChange={(e) => onChange(index, key, e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "7px 10px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                fontSize: 13,
                outline: "none",
                background: "#fff",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const RequestShipment = (props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    sourceCountry: "CN",
    destinationZip: "",
    productTitle: "",
    productLink: "",
    noProductLink: false,
    productCategory: "",
    cartons: [],
  });
  const [productImage, setProductImage] = useState(null);
  const [errors, setErrors] = useState({});

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const addCarton = () =>
    setForm((f) => ({
      ...f,
      cartons: [
        ...f.cartons,
        {
          quantity: "",
          weight: "",
          price: "",
          contains: "",
          hsCode: "",
          cbm: "",
        },
      ],
    }));

  const updateCarton = (i, key, val) =>
    setForm((f) => {
      const cartons = [...f.cartons];
      cartons[i] = { ...cartons[i], [key]: val };
      return { ...f, cartons };
    });

  const removeCarton = (i) =>
    setForm((f) => ({
      ...f,
      cartons: f.cartons.filter((_, idx) => idx !== i),
    }));

  const validate = () => {
    const e = {};
    if (!form.sourceCountry) e.sourceCountry = "Required";
    if (!form.noProductLink && !form.productLink)
      e.productLink = "Paste a product link or check 'Own Source'";
    if (!form.productCategory) e.productCategory = "Select a category";
    if (!form.productTitle) e.productTitle = "Enter a product title";
    if (!productImage) e.productImage = "Upload at least one product image";
    if (form.cartons.length === 0) e.cartons = "Add at least one package";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      // if (onSubmit) onSubmit(form);
      navigate("/request-shipment?step=2");
      setStep(2);
    }
  };

  useEffect(() => {
    const step = searchParams.get("step");

    // No step -> redirect to step=1
    if (!step) {
      navigate("/request-shipment?step=1", { replace: true });
      return;
    }

    // Prevent accessing step 2 directly
    if (step === "2") {
      // Replace this condition with your actual validation
      const canAccessStep2 = () => {
        const e = {};
        if (!form.sourceCountry) e.sourceCountry = "Required";
        if (!form.noProductLink && !form.productLink)
          e.productLink = "Paste a product link or check 'Own Source'";
        if (!form.productCategory) e.productCategory = "Select a category";
        if (!productImage) e.productImage = "Upload at least one product image";
        if (form.cartons.length === 0) e.cartons = "Add at least one package";

        setErrors(e);
        return Object.keys(e).length === 0;
      };

      if (!canAccessStep2()) {
        navigate("/request-shipment?step=1", { replace: true });
      }
    }
  }, [searchParams, navigate, form, productImage]);

  const inputStyle = (errKey) => ({
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: 8,
    border: `1.5px solid ${errors[errKey] ? "#ef4444" : "#d1d5db"}`,
    fontSize: 14,
    outline: "none",
    background: "#fff",
    color: "#111827",
  });

  return (
    <div className="p-8 max-w-[1380px] mx-auto">
      <div
        style={{
          maxWidth: 760,
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Request Shipment{" "}
          </h2>
          {/* <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "#16a34a",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span style={{ fontSize: 16 }}>🎬</span> See how Ship For Me works
          </button> */}
        </div>

        {/* Stepper */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 28,
            gap: 0,
          }}
        >
          {[
            { n: 1, label: "Product Details" },
            { n: 2, label: "Shipping Info" },
          ].map(({ n, label }, i) => (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                flex: i < 2 ? 1 : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 8,
                  border:
                    step === n ? "1.5px solid #2F5651" : "1.5px solid #e5e7eb",
                  background: step === n ? "#fff" : "#f9fafb",
                  cursor: step > n ? "pointer" : "default",
                }}
                onClick={() => step > n && setStep(n)}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: step >= n ? "#2F5651" : "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {step > n ? "✓" : n}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: step === n ? 600 : 400,
                    color: step === n ? "#111827" : "#9ca3af",
                  }}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 1.5,
                    background: "#e5e7eb",
                    margin: "0 4px",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        {step === 1 && (
          <div>
            <h3
              style={{
                margin: "0 0 16px",
                fontSize: 16,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Shipping Details
            </h3>

            {/* AI Smart Fill */}
            {/* <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
                >
                  AI Smart Fill-up
                </span>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#16a34a",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  ⓘ Instructions
                </button>
              </div>
              <FileDropZone
                icon="🤖"
                hint="Packing list, order details, or invoice (image, PDF, Excel, CSV) to auto-fill details"
                accept=".pdf,.xlsx,.csv,image/*"
                onFileChange={setSmartFillFile}
                file={smartFillFile}
              />
            </div> */}

            {/* From / To */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  From (Source Country){" "}
                  <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select
                  value={form.sourceCountry}
                  onChange={(e) => set("sourceCountry", e.target.value)}
                  style={{
                    ...inputStyle("sourceCountry"),
                    appearance: "none",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: 32,
                  }}
                >
                  {SOURCE_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  To (Destination Postal Code)
                </label>
                <div style={{ display: "flex", gap: 6 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0 10px",
                      border: "1.5px solid #d1d5db",
                      borderRadius: 8,
                      background: "#fff",
                      fontSize: 20,
                    }}
                  >
                    🇧🇩
                  </div>
                  <input
                    type="text"
                    placeholder="Postal code / Zip code of your destination"
                    value={form.destinationZip}
                    onChange={(e) => set("destinationZip", e.target.value)}
                    style={{ ...inputStyle(), flex: 1 }}
                  />
                </div>
              </div>
            </div>

            {/* Product Title */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Product Title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your product title"
                value={form.productTitle}
                onChange={(e) => set("productTitle", e.target.value)}
                style={{ ...inputStyle("productTitle") }}
              />
              {errors.productTitle && (
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 12,
                    color: "#ef4444",
                  }}
                >
                  {errors.productTitle}
                </p>
              )}
            </div>

            {/* Product Link / Category */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 6,
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Product Link <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="url"
                  placeholder="Paste your link here"
                  value={form.productLink}
                  disabled={form.noProductLink}
                  onChange={(e) => set("productLink", e.target.value)}
                  style={{
                    ...inputStyle("productLink"),
                    opacity: form.noProductLink ? 0.5 : 1,
                  }}
                />
                {errors.productLink && (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12,
                      color: "#ef4444",
                    }}
                  >
                    {errors.productLink}
                  </p>
                )}
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Product Category <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <select
                  value={form.productCategory}
                  onChange={(e) => set("productCategory", e.target.value)}
                  style={{
                    ...inputStyle("productCategory"),
                    appearance: "none",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: 32,
                  }}
                >
                  <option value="">Select your product category</option>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.productCategory && (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: 12,
                      color: "#ef4444",
                    }}
                  >
                    {errors.productCategory}
                  </p>
                )}
              </div>
            </div>

            {/* Own Source checkbox */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: "#374151",
                cursor: "pointer",
                marginBottom: 20,
              }}
            >
              <input
                type="checkbox"
                checked={form.noProductLink}
                onChange={(e) => {
                  set("noProductLink", e.target.checked);
                  if (e.target.checked) set("productLink", "");
                }}
                style={{ width: 15, height: 15, accentColor: "#16a34a" }}
              />
              I don't have any product link (Own Source)
            </label>

            {/* Upload Image */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: 2,
                }}
              >
                Upload Image <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <FileDropZone
                icon="⛶"
                hint="All image formats, PDF, XLSX, CSV. Max 3 files, 20 MB each."
                accept="image/*,.pdf,.xlsx,.csv"
                onFileChange={setProductImage}
                file={productImage}
              />
              {errors.productImage && (
                <p
                  style={{ margin: "6px 0 0", fontSize: 12, color: "#ef4444" }}
                >
                  {errors.productImage}
                </p>
              )}
            </div>

            {/* Cartons */}
            <div style={{ marginBottom: 8 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: 8,
                }}
              >
                Cartons <span style={{ color: "#ef4444" }}>*</span>
              </label>

              {form.cartons.map((c, i) => (
                <CartonRow
                  key={i}
                  carton={c}
                  index={i}
                  onChange={updateCarton}
                  onRemove={() => removeCarton(i)}
                />
              ))}

              <button
                type="button"
                onClick={addCarton}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: `1.5px dashed ${errors.cartons ? "#ef4444" : "#d1d5db"}`,
                  borderRadius: 8,
                  background: "#fafafa",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontWeight: 500,
                }}
              >
                <span style={{ fontSize: 18, color: "#16a34a" }}>+</span>
                Add Carton Details
                <span
                  style={{ fontSize: 12, fontWeight: 400, color: "#9ca3af" }}
                >
                  — Enter Quantity, Weight, Price, Contains, HS Code, CBM
                </span>
              </button>
              {errors.cartons && (
                <p
                  style={{ margin: "6px 0 0", fontSize: 12, color: "#ef4444" }}
                >
                  {errors.cartons}
                </p>
              )}
            </div>

            {/* Next Step */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 28,
              }}
            >
              <button
                type="button"
                onClick={handleNext}
                style={{
                  background: "#2F5651",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "11px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 1px 4px rgba(22,163,74,0.25)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#488e85")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#2F5651")
                }
              >
                Next Step <span style={{ fontSize: 16 }}>›</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚚</div>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#374151" }}>
              Select Shipping Company
            </p>
            <p style={{ fontSize: 13 }}>
              This step would show available shipping options based on your
              carton details.
            </p>
            <button
              type="button"
              onClick={() => {
                navigate("/request-shipment?step=1", { replace: true });
                setStep(1);
              }}
              style={{
                marginTop: 16,
                background: "none",
                border: "1.5px solid #d1d5db",
                borderRadius: 8,
                padding: "8px 20px",
                cursor: "pointer",
                fontSize: 13,
                color: "#374151",
              }}
            >
              ← Back to Shipping Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
