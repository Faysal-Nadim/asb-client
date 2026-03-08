// import React, { useState } from "react";

// /**
//  * @author
//  * @function AddProduct
//  **/

// const currencies = ["USD", "EUR", "GBP", "BDT"];

// export const AddProduct = () => {
//   const [product, setProduct] = useState({
//     title: "",
//     slug: "",
//     shortDescription: "",
//     description: "",
//     categoryId: "",
//     status: "PENDING",
//     isFeatured: false,
//     isCustomizable: false,
//     isMultiVariant: true,

//     media: [],
//     options: [],
//     variants: [],
//     occasions: [],
//     discounts: [],

//     metaTitle: "",
//     metaDescription: "",
//   });

//   /* ---------------- BASIC FIELD HANDLER ---------------- */

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProduct({
//       ...product,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   /* ---------------- MEDIA ---------------- */

//   const addMedia = () => {
//     setProduct({
//       ...product,
//       media: [
//         ...product.media,
//         { url: "", alt: "", sortOrder: 0, isPrimary: false },
//       ],
//     });
//   };

//   const updateMedia = (index, field, value) => {
//     const updated = [...product.media];
//     updated[index][field] = value;
//     setProduct({ ...product, media: updated });
//   };

//   /* ---------------- OPTIONS ---------------- */

//   const addOption = () => {
//     setProduct({
//       ...product,
//       options: [...product.options, { key: "", values: [""] }],
//     });
//   };

//   const updateOption = (index, field, value) => {
//     const updated = [...product.options];
//     updated[index][field] = value;
//     setProduct({ ...product, options: updated });
//   };

//   /* ---------------- VARIANTS ---------------- */

//   const addVariant = () => {
//     setProduct({
//       ...product,
//       variants: [
//         ...product.variants,
//         {
//           sku: "",
//           stock: 0,
//           optionValues: [],
//           prices: currencies.map((c) => ({
//             currency: c,
//             basePrice: "",
//             finalPrice: "",
//           })),
//         },
//       ],
//     });
//   };

//   const updateVariant = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setProduct({ ...product, variants: updated });
//   };

//   /* ---------------- SUBMIT ---------------- */

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Final Payload:", product);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex justify-center p-8">
//       <div className="bg-white w-full max-w-6xl p-8 rounded-2xl shadow-sm space-y-12">
//         <h1 className="text-2xl font-semibold">Create Product</h1>

//         <form onSubmit={handleSubmit} className="space-y-10">
//           {/* ================= BASIC INFO ================= */}
//           <Section title="Basic Information">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 name="title"
//                 placeholder="Title"
//                 value={product.title}
//                 onChange={handleChange}
//               />
//               <Input
//                 name="slug"
//                 placeholder="Slug"
//                 value={product.slug}
//                 onChange={handleChange}
//               />
//               <Input
//                 name="categoryId"
//                 placeholder="Category ID"
//                 value={product.categoryId}
//                 onChange={handleChange}
//               />
//               <select
//                 name="status"
//                 value={product.status}
//                 onChange={handleChange}
//                 className="input"
//               >
//                 <option value="PENDING">Pending</option>
//                 <option value="ACTIVE">Active</option>
//                 <option value="ARCHIVED">Archived</option>
//                 <option value="REJECTED">Rejected</option>
//               </select>
//             </div>

//             <textarea
//               name="shortDescription"
//               placeholder="Short Description"
//               value={product.shortDescription}
//               onChange={handleChange}
//               className="input mt-4"
//             />

//             <textarea
//               name="description"
//               placeholder="Description"
//               value={product.description}
//               onChange={handleChange}
//               className="input mt-4"
//             />

//             <div className="flex gap-6 mt-4">
//               <Checkbox
//                 name="isFeatured"
//                 label="Featured"
//                 onChange={handleChange}
//               />
//               <Checkbox
//                 name="isCustomizable"
//                 label="Customizable"
//                 onChange={handleChange}
//               />
//               <Checkbox
//                 name="isMultiVariant"
//                 label="Multi Variant"
//                 onChange={handleChange}
//               />
//             </div>
//           </Section>

//           {/* ================= MEDIA ================= */}
//           <Section title="Media">
//             <button
//               type="button"
//               onClick={addMedia}
//               className="btn-secondary mb-4"
//             >
//               + Add Media
//             </button>

//             {product.media.map((m, i) => (
//               <div
//                 key={i}
//                 className="border p-4 rounded-lg mb-4 grid md:grid-cols-2 gap-4"
//               >
//                 <Input
//                   placeholder="Image URL"
//                   value={m.url}
//                   onChange={(e) => updateMedia(i, "url", e.target.value)}
//                 />
//                 <Input
//                   placeholder="Alt Text"
//                   value={m.alt}
//                   onChange={(e) => updateMedia(i, "alt", e.target.value)}
//                 />
//               </div>
//             ))}
//           </Section>

//           {/* ================= OPTIONS ================= */}
//           <Section title="Product Options">
//             <button
//               type="button"
//               onClick={addOption}
//               className="btn-secondary mb-4"
//             >
//               + Add Option
//             </button>

//             {product.options.map((opt, i) => (
//               <div key={i} className="border p-4 rounded-lg mb-4">
//                 <Input
//                   placeholder="Option Key (e.g. Size)"
//                   value={opt.key}
//                   onChange={(e) => updateOption(i, "key", e.target.value)}
//                 />
//               </div>
//             ))}
//           </Section>

//           {/* ================= VARIANTS ================= */}
//           <Section title="Variants">
//             <button
//               type="button"
//               onClick={addVariant}
//               className="btn-secondary mb-4"
//             >
//               + Add Variant
//             </button>

//             {product.variants.map((v, i) => (
//               <div key={i} className="border p-4 rounded-xl mb-6 space-y-4">
//                 <Input
//                   placeholder="SKU"
//                   value={v.sku}
//                   onChange={(e) => updateVariant(i, "sku", e.target.value)}
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Stock"
//                   value={v.stock}
//                   onChange={(e) => updateVariant(i, "stock", e.target.value)}
//                 />

//                 <div className="grid md:grid-cols-2 gap-4">
//                   {v.prices.map((p, pi) => (
//                     <div key={pi} className="border p-3 rounded-lg">
//                       <p className="text-xs font-semibold">{p.currency}</p>
//                       <Input placeholder="Base Price" />
//                       <Input placeholder="Final Price" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </Section>

//           {/* ================= SEO ================= */}
//           <Section title="SEO">
//             <Input
//               name="metaTitle"
//               placeholder="Meta Title"
//               value={product.metaTitle}
//               onChange={handleChange}
//             />
//             <textarea
//               name="metaDescription"
//               placeholder="Meta Description"
//               value={product.metaDescription}
//               onChange={handleChange}
//               className="input mt-4"
//             />
//           </Section>

//           <div className="flex justify-end">
//             <button type="submit" className="btn-primary">
//               Save Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// /* ---------------- SMALL UI HELPERS ---------------- */

// function Section({ title, children }) {
//   return (
//     <div>
//       <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );
// }

// function Input(props) {
//   return <input {...props} className="input" />;
// }

// function Checkbox({ name, label, onChange }) {
//   return (
//     <label className="flex items-center gap-2">
//       <input type="checkbox" name={name} onChange={onChange} />
//       {label}
//     </label>
//   );
// }

import { useState } from "react";

/* ─── constants ──────────────────────────────────────────────────── */
const CURRENCIES = ["USD", "EUR", "GBP", "BDT"];
const STATUSES = ["PENDING", "ACTIVE", "ARCHIVED", "REJECTED"];
const MEDIA_TYPES = ["IMAGE", "VIDEO"];

/* ─── helpers ────────────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 8);
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const mkVariant = () => ({
  _id: uid(),
  sku: "",
  title: "",
  stock: 0,
  lowStockThreshold: 5,
  isDefault: false,
  prices: CURRENCIES.map((c) => ({
    currency: c,
    basePrice: "",
    finalPrice: "",
  })),
  variantOptions: [],
});
const mkOption = () => ({ _id: uid(), key: "", values: [""] });
const mkMedia = () => ({
  _id: uid(),
  path: "",
  key: "",
  type: "IMAGE",
  alt: "",
  sortOrder: 0,
});

/* ─── tiny design system ─────────────────────────────────────────── */
const c = {
  bg: "#0c0f1a",
  surface: "#111827",
  surface2: "#0f1322",
  border: "#1e2940",
  muted: "#334155",
  text: "#f1f5f9",
  textMd: "#cbd5e1",
  textSm: "#94a3b8",
  textXs: "#64748b",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  pink: "#ec4899",
  red: "#f87171",
};

const inp = {
  width: "100%",
  background: c.bg,
  border: `1px solid ${c.border}`,
  borderRadius: 7,
  padding: "9px 12px",
  color: c.text,
  fontSize: 13,
  fontFamily: "'JetBrains Mono',monospace",
  outline: "none",
  transition: "border .15s, box-shadow .15s",
};

/* ─── base components ────────────────────────────────────────────── */
function Lbl({ children, required }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 11,
        fontWeight: 700,
        color: c.textSm,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        marginBottom: 6,
      }}
    >
      {children}
      {required && <span style={{ color: c.red, marginLeft: 3 }}>*</span>}
    </label>
  );
}
function Inp({ sx, ...p }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      {...p}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        ...inp,
        ...sx,
        border: `1px solid ${focus ? c.indigo : c.border}`,
        boxShadow: focus ? `0 0 0 3px ${c.indigo}20` : undefined,
      }}
    />
  );
}
function Txta({ sx, ...p }) {
  const [focus, setFocus] = useState(false);
  return (
    <textarea
      {...p}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        ...inp,
        resize: "vertical",
        lineHeight: 1.6,
        ...sx,
        border: `1px solid ${focus ? c.indigo : c.border}`,
        boxShadow: focus ? `0 0 0 3px ${c.indigo}20` : undefined,
      }}
    />
  );
}
function Sel({ children, sx, ...p }) {
  return (
    <select {...p} style={{ ...inp, ...sx }}>
      {children}
    </select>
  );
}
function Card({ children, title, accent = "#6366f1" }) {
  return (
    <div
      style={{
        background: c.surface,
        border: `1px solid ${c.border}`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 10,
        padding: "20px 22px",
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: c.textSm,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
function Badge({ children, color = c.indigo }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: color + "22",
        color,
        border: `1px solid ${color}44`,
        borderRadius: 999,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </span>
  );
}
function Toggle({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 40,
          height: 22,
          borderRadius: 999,
          flexShrink: 0,
          background: checked ? c.indigo : c.muted,
          position: "relative",
          transition: "background .2s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: checked ? 20 : 3,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left .2s",
            boxShadow: "0 1px 4px #0009",
          }}
        />
      </div>
      <span style={{ fontSize: 13, color: c.textMd }}>{label}</span>
    </label>
  );
}
function Btn({ children, variant = "ghost", onClick, type = "button", sx }) {
  const base = {
    border: "none",
    borderRadius: 7,
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "'Sora',sans-serif",
    transition: "all .15s",
  };
  const variants = {
    ghost: {
      background: "none",
      border: `1px solid ${c.muted}`,
      color: c.textSm,
      padding: "6px 14px",
    },
    danger: {
      background: c.red + "15",
      border: `1px solid ${c.red}44`,
      color: c.red,
      padding: "6px 12px",
    },
    add: {
      background: c.surface,
      border: `1px dashed ${c.muted}`,
      color: c.indigo,
      padding: "10px 0",
      width: "100%",
      fontSize: 13,
    },
    primary: {
      background: c.indigo,
      color: "#fff",
      padding: "10px 28px",
      fontSize: 14,
      fontWeight: 700,
      boxShadow: `0 4px 14px ${c.indigo}44`,
    },
    secondary: {
      background: "#1e2940",
      border: `1px solid ${c.muted}`,
      color: c.textSm,
      padding: "10px 22px",
      fontSize: 14,
    },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...sx }}
    >
      {children}
    </button>
  );
}
function Grid({ children, cols = 2 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols},1fr)`,
        gap: 14,
      }}
    >
      {children}
    </div>
  );
}
function Span2({ children }) {
  return <div style={{ gridColumn: "span 2" }}>{children}</div>;
}
function SecHead({ step, title, sub }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          flexShrink: 0,
          background: `linear-gradient(135deg,${c.indigo},${c.violet})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          color: "#fff",
          fontSize: 14,
          boxShadow: `0 2px 8px ${c.indigo}44`,
        }}
      >
        {step}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, color: c.text }}>
          {title}
        </div>
        {sub && (
          <div style={{ fontSize: 12, color: c.textXs, marginTop: 2 }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Variant row ────────────────────────────────────────────────── */
function VariantRow({ v, idx, onChange, onRemove }) {
  const set = (f, val) => onChange({ ...v, [f]: val });
  const setPrice = (cur, f, val) =>
    onChange({
      ...v,
      prices: v.prices.map((p) =>
        p.currency === cur ? { ...p, [f]: val } : p,
      ),
    });
  const setVO = (i, f, val) =>
    onChange({
      ...v,
      variantOptions: v.variantOptions.map((o, j) =>
        j === i ? { ...o, [f]: val } : o,
      ),
    });

  return (
    <div
      style={{
        background: c.surface2,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "16px 18px",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Badge color={c.violet}>Variant {idx + 1}</Badge>
          {v.isDefault && <Badge color={c.emerald}>Default</Badge>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn onClick={() => set("isDefault", !v.isDefault)}>
            {v.isDefault ? "★ Default" : "☆ Set Default"}
          </Btn>
          <Btn variant="danger" onClick={onRemove}>
            Remove
          </Btn>
        </div>
      </div>

      {/* sku / title / stock */}
      <Grid>
        <div>
          <Lbl required>SKU</Lbl>
          <Inp
            value={v.sku}
            onChange={(e) => set("sku", e.target.value)}
            placeholder="e.g. PROD-RED-M"
          />
        </div>
        <div>
          <Lbl>Title</Lbl>
          <Inp
            value={v.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Red / Medium"
          />
        </div>
        <div>
          <Lbl>Stock</Lbl>
          <Inp
            type="number"
            value={v.stock}
            onChange={(e) => set("stock", +e.target.value)}
            min={0}
          />
        </div>
        <div>
          <Lbl>Low Stock Threshold</Lbl>
          <Inp
            type="number"
            value={v.lowStockThreshold}
            onChange={(e) => set("lowStockThreshold", +e.target.value)}
            min={0}
          />
        </div>
      </Grid>

      {/* multi-currency prices */}
      <div style={{ marginTop: 16 }}>
        <Lbl>Prices — Base & Final per Currency</Lbl>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 10,
            marginTop: 8,
          }}
        >
          {v.prices.map((p) => (
            <div key={p.currency}>
              <div
                style={{
                  background: c.border,
                  color: c.textSm,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textAlign: "center",
                  padding: "3px 0",
                  borderRadius: "6px 6px 0 0",
                }}
              >
                {p.currency}
              </div>
              <Inp
                type="number"
                placeholder="Base"
                value={p.basePrice}
                onChange={(e) =>
                  setPrice(p.currency, "basePrice", e.target.value)
                }
                sx={{ borderRadius: "0", marginBottom: 2 }}
              />
              <Inp
                type="number"
                placeholder="Final"
                value={p.finalPrice}
                onChange={(e) =>
                  setPrice(p.currency, "finalPrice", e.target.value)
                }
                sx={{ borderRadius: "0 0 6px 6px" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* variant options */}
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Lbl>Variant Options (VariantOption rows)</Lbl>
          <Btn
            onClick={() =>
              onChange({
                ...v,
                variantOptions: [...v.variantOptions, { key: "", value: "" }],
              })
            }
          >
            + Add Row
          </Btn>
        </div>
        {v.variantOptions.length === 0 ? (
          <p style={{ fontSize: 12, color: c.textXs, fontStyle: "italic" }}>
            No options yet — click "+ Add Row"
          </p>
        ) : (
          v.variantOptions.map((vo, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <Inp
                value={vo.key}
                onChange={(e) => setVO(i, "key", e.target.value)}
                placeholder="key e.g. color"
                sx={{ flex: 1 }}
              />
              <Inp
                value={vo.value}
                onChange={(e) => setVO(i, "value", e.target.value)}
                placeholder="value e.g. Red"
                sx={{ flex: 1 }}
              />
              <Btn
                variant="danger"
                onClick={() =>
                  onChange({
                    ...v,
                    variantOptions: v.variantOptions.filter((_, j) => j !== i),
                  })
                }
              >
                ✕
              </Btn>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Media row ──────────────────────────────────────────────────── */
function MediaRow({ m, onChange, onRemove }) {
  const set = (f, val) => onChange({ ...m, [f]: val });
  return (
    <div
      style={{
        background: c.surface2,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "14px 16px",
      }}
    >
      <Grid>
        <Span2>
          <Lbl required>Path / URL</Lbl>
          <Inp
            value={m.path}
            onChange={(e) => set("path", e.target.value)}
            placeholder="https://cdn.example.com/image.jpg"
          />
        </Span2>
        <div>
          <Lbl>Storage Key</Lbl>
          <Inp
            value={m.key}
            onChange={(e) => set("key", e.target.value)}
            placeholder="s3-object-key"
          />
        </div>
        <div>
          <Lbl>Media Type</Lbl>
          <Sel value={m.type} onChange={(e) => set("type", e.target.value)}>
            {MEDIA_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Sel>
        </div>
        <div>
          <Lbl>Alt Text</Lbl>
          <Inp
            value={m.alt}
            onChange={(e) => set("alt", e.target.value)}
            placeholder="Describe for accessibility"
          />
        </div>
        <div>
          <Lbl>Sort Order</Lbl>
          <Inp
            type="number"
            value={m.sortOrder}
            onChange={(e) => set("sortOrder", +e.target.value)}
            min={0}
          />
        </div>
      </Grid>
      <div style={{ textAlign: "right", marginTop: 10 }}>
        <Btn variant="danger" onClick={onRemove}>
          Remove
        </Btn>
      </div>
    </div>
  );
}

/* ─── Option row ─────────────────────────────────────────────────── */
function OptionRow({ o, onChange, onRemove }) {
  return (
    <div
      style={{
        background: c.surface2,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
          alignItems: "center",
        }}
      >
        <Inp
          value={o.key}
          onChange={(e) => onChange({ ...o, key: e.target.value })}
          placeholder="Option key (e.g. Size, Color)"
          sx={{ flex: 1 }}
        />
        <Btn variant="danger" onClick={onRemove}>
          Remove Group
        </Btn>
      </div>
      <Lbl>Values (ProductOptionValue)</Lbl>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
        {o.values.map((val, i) => (
          <div key={i} style={{ display: "flex", gap: 4 }}>
            <Inp
              value={val}
              onChange={(e) =>
                onChange({
                  ...o,
                  values: o.values.map((v, j) =>
                    j === i ? e.target.value : v,
                  ),
                })
              }
              placeholder="value"
              sx={{ width: 110 }}
            />
            <Btn
              variant="danger"
              onClick={() =>
                onChange({ ...o, values: o.values.filter((_, j) => j !== i) })
              }
            >
              ✕
            </Btn>
          </div>
        ))}
        <Btn onClick={() => onChange({ ...o, values: [...o.values, ""] })}>
          + Add Value
        </Btn>
      </div>
    </div>
  );
}

/* ─── MAIN FORM ──────────────────────────────────────────────────── */
export const AddProduct = ({ onSubmit }) => {
  /* basic */
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugLocked, setSlugLocked] = useState(false);
  const [shopId, setShopId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("PENDING");
  /* flags */
  const [isFeatured, setIsFeatured] = useState(false);
  const [isMultiVariant, setIsMultiVariant] = useState(true);
  const [isCustomizable, setIsCustomizable] = useState(false);
  /* occasions */
  const [occasions, setOccasions] = useState("");
  /* seo */
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  /* relations */
  const [variants, setVariants] = useState([mkVariant()]);
  const [media, setMedia] = useState([mkMedia()]);
  const [options, setOptions] = useState([mkOption()]);
  /* ui */
  const [tab, setTab] = useState("basic");
  const [done, setDone] = useState(false);

  const handleTitle = (val) => {
    setTitle(val);
    if (!slugLocked) setSlug(slugify(val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      slug,
      shopId: +shopId,
      categoryId: +categoryId,
      shortDescription: shortDesc,
      description: desc,
      status,
      isFeatured,
      isMultiVariant,
      isCustomizable,
      occasions: occasions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      seo: { metaTitle, metaDescription: metaDesc, metaKeywords, canonicalUrl },
      variants: variants.map(({ _id, ...v }) => ({
        ...v,
        prices: v.prices.filter((p) => p.basePrice || p.finalPrice),
      })),
      media: media.map(({ _id, ...m }) => m),
      options: options.map(({ _id, ...o }) => ({
        key: o.key,
        values: o.values.filter(Boolean),
      })),
    };
    console.log("📦 Product payload:", payload);
    if (onSubmit) onSubmit(payload);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  const TABS = [
    { id: "basic", label: "Basic Info" },
    { id: "variants", label: `Variants (${variants.length})` },
    { id: "media", label: `Media (${media.length})` },
    { id: "options", label: `Options (${options.length})` },
    { id: "seo", label: "SEO" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:${c.bg}}
        ::-webkit-scrollbar{width:6px;background:#0a0d15}
        ::-webkit-scrollbar-thumb{background:${c.muted};border-radius:3px}
        button{cursor:pointer;font-family:'Sora',sans-serif!important;transition:opacity .15s}
        button:hover{opacity:.82}
      `}</style>

      <div
        style={{
          fontFamily: "'Sora',sans-serif",
          background: c.bg,
          minHeight: "100vh",
          color: c.text,
          maxWidth: 900,
          margin: "0 auto",
          paddingBottom: 100,
        }}
      >
        {/* ── header ── */}
        <div
          style={{
            background: "linear-gradient(135deg,#0f1629,#1a1040)",
            borderBottom: `1px solid ${c.border}`,
            padding: "18px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                flexShrink: 0,
                background: `linear-gradient(135deg,${c.indigo},${c.violet})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 20,
                color: "#fff",
                boxShadow: `0 4px 14px ${c.indigo}44`,
              }}
            >
              P
            </div>
            <div>
              <div
                style={{ fontWeight: 700, fontSize: 19, letterSpacing: -0.3 }}
              >
                Add New Product
              </div>
              <div style={{ fontSize: 12, color: c.textXs, marginTop: 2 }}>
                All sections map 1:1 to your Prisma schema
              </div>
            </div>
          </div>
          <Badge color={c.amber}>{status}</Badge>
        </div>

        {/* ── tabs ── */}
        <div
          style={{
            display: "flex",
            padding: "12px 28px 0",
            borderBottom: `1px solid ${c.border}`,
            background: "#0f1322",
            overflowX: "auto",
            gap: 2,
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "9px 18px",
                background: tab === t.id ? "#1e2940" : "none",
                border: "none",
                color: tab === t.id ? c.indigo : c.textXs,
                fontSize: 13,
                fontWeight: 600,
                borderRadius: "6px 6px 0 0",
                whiteSpace: "nowrap",
                borderBottom:
                  tab === t.id
                    ? `2px solid ${c.indigo}`
                    : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* ══════════════ TAB 1 — BASIC INFO ══════════════ */}
          {tab === "basic" && (
            <div
              style={{
                padding: "28px 28px 0",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <SecHead
                step="1"
                title="Basic Information"
                sub="Core product fields — maps to the Product model"
              />

              <Card accent={c.indigo} title="Identity">
                <Grid>
                  <Span2>
                    <Lbl required>Product Title</Lbl>
                    <Inp
                      value={title}
                      onChange={(e) => handleTitle(e.target.value)}
                      placeholder="e.g. Handcrafted Silk Scarf"
                      required
                    />
                  </Span2>
                  <div>
                    <Lbl required>Slug</Lbl>
                    <Inp
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        setSlugLocked(true);
                      }}
                      placeholder="auto-generated from title"
                      required
                    />
                  </div>
                  <div>
                    <Lbl required>Status</Lbl>
                    <Sel
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Sel>
                  </div>
                  <div>
                    <Lbl required>Shop ID</Lbl>
                    <Inp
                      type="number"
                      value={shopId}
                      onChange={(e) => setShopId(e.target.value)}
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <Lbl required>Category ID</Lbl>
                    <Inp
                      type="number"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      placeholder="5"
                      required
                    />
                  </div>
                </Grid>
              </Card>

              <Card accent={c.violet} title="Description">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div>
                    <Lbl>Short Description</Lbl>
                    <Txta
                      value={shortDesc}
                      onChange={(e) => setShortDesc(e.target.value)}
                      rows={2}
                      placeholder="One-liner shown in product listings…"
                    />
                  </div>
                  <div>
                    <Lbl>Full Description</Lbl>
                    <Txta
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      rows={7}
                      placeholder="Detailed description, care instructions, materials…"
                    />
                  </div>
                </div>
              </Card>

              <Card accent={c.emerald} title="Flags">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <Toggle
                    label="isFeatured — highlight on homepage / featured lists"
                    checked={isFeatured}
                    onChange={setIsFeatured}
                  />
                  <Toggle
                    label="isMultiVariant — product has multiple variants (SKUs)"
                    checked={isMultiVariant}
                    onChange={setIsMultiVariant}
                  />
                  <Toggle
                    label="isCustomizable — allow buyer to customise order"
                    checked={isCustomizable}
                    onChange={setIsCustomizable}
                  />
                </div>
              </Card>

              <Card
                accent={c.amber}
                title="Occasions — ProductOccasion (optional)"
              >
                <Lbl>Occasion slugs (comma-separated)</Lbl>
                <Inp
                  value={occasions}
                  onChange={(e) => setOccasions(e.target.value)}
                  placeholder="birthday, wedding, anniversary"
                />
                <p style={{ fontSize: 11, color: c.textXs, marginTop: 6 }}>
                  These will be looked up against the Occasion table and linked
                  via ProductOccasion.
                </p>
              </Card>
            </div>
          )}

          {/* ══════════════ TAB 2 — VARIANTS ══════════════ */}
          {tab === "variants" && (
            <div
              style={{
                padding: "28px 28px 0",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <SecHead
                step="2"
                title="Variants"
                sub="Variant · VariantPrice (multi-currency) · VariantOption"
              />
              {variants.map((v, i) => (
                <VariantRow
                  key={v._id}
                  v={v}
                  idx={i}
                  onChange={(upd) =>
                    setVariants(
                      variants.map((x) => (x._id === v._id ? upd : x)),
                    )
                  }
                  onRemove={() =>
                    setVariants(variants.filter((x) => x._id !== v._id))
                  }
                />
              ))}
              <Btn
                variant="add"
                onClick={() => setVariants([...variants, mkVariant()])}
              >
                + Add Variant
              </Btn>
            </div>
          )}

          {/* ══════════════ TAB 3 — MEDIA ══════════════ */}
          {tab === "media" && (
            <div
              style={{
                padding: "28px 28px 0",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <SecHead
                step="3"
                title="Product Media"
                sub="ProductMedia — images and videos with sort order"
              />
              {media.map((m) => (
                <MediaRow
                  key={m._id}
                  m={m}
                  onChange={(upd) =>
                    setMedia(media.map((x) => (x._id === m._id ? upd : x)))
                  }
                  onRemove={() =>
                    setMedia(media.filter((x) => x._id !== m._id))
                  }
                />
              ))}
              <Btn
                variant="add"
                onClick={() => setMedia([...media, mkMedia()])}
              >
                + Add Media
              </Btn>
            </div>
          )}

          {/* ══════════════ TAB 4 — OPTIONS ══════════════ */}
          {tab === "options" && (
            <div
              style={{
                padding: "28px 28px 0",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <SecHead
                step="4"
                title="Product Options"
                sub="ProductOption + ProductOptionValue — storefront filter UI"
              />
              {options.map((o) => (
                <OptionRow
                  key={o._id}
                  o={o}
                  onChange={(upd) =>
                    setOptions(options.map((x) => (x._id === o._id ? upd : x)))
                  }
                  onRemove={() =>
                    setOptions(options.filter((x) => x._id !== o._id))
                  }
                />
              ))}
              <Btn
                variant="add"
                onClick={() => setOptions([...options, mkOption()])}
              >
                + Add Option Group
              </Btn>
            </div>
          )}

          {/* ══════════════ TAB 5 — SEO ══════════════ */}
          {tab === "seo" && (
            <div
              style={{
                padding: "28px 28px 0",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <SecHead
                step="5"
                title="SEO"
                sub="metaTitle · metaDescription · metaKeywords · canonicalUrl"
              />
              <Card accent={c.pink}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div>
                    <Lbl>Meta Title</Lbl>
                    <Inp
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Defaults to product title if empty"
                    />
                  </div>
                  <div>
                    <Lbl>Meta Description</Lbl>
                    <Txta
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                      rows={3}
                      placeholder="~160 characters shown in search results"
                    />
                    <p
                      style={{
                        fontSize: 11,
                        color: metaDesc.length > 160 ? c.red : c.textXs,
                        marginTop: 4,
                      }}
                    >
                      {metaDesc.length} / 160 characters
                    </p>
                  </div>
                  <div>
                    <Lbl>Meta Keywords</Lbl>
                    <Inp
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      placeholder="comma-separated, e.g. scarf, silk, handmade"
                    />
                  </div>
                  <div>
                    <Lbl>Canonical URL</Lbl>
                    <Inp
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder="https://yourdomain.com/products/my-scarf"
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ── sticky footer ── */}
          <div
            style={{
              position: "sticky",
              bottom: 0,
              background: c.bg,
              borderTop: `1px solid ${c.border}`,
              padding: "14px 28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <span style={{ fontSize: 12, color: c.textXs }}>
              {variants.length} variant{variants.length !== 1 ? "s" : ""} ·{" "}
              {media.length} media · {options.length} option group
              {options.length !== 1 ? "s" : ""}
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn variant="secondary">Save Draft</Btn>
              <Btn
                variant="primary"
                type="submit"
                sx={{ background: done ? c.emerald : c.indigo }}
              >
                {done ? "✓ Submitted!" : "Submit Product"}
              </Btn>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
