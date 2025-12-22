// pages/OnboardingAgreement.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const AGREEMENT_MD = `
Aleeha Seller Policy (Last updated: Aug 2025)

1) Selling Basics
a. What can be sold on Aleeha
- Aleeha is a curated marketplace where buyers expect authentic, creative, or carefully sourced items.
- Items listed must be made, designed, handpicked, or sourced by you (the seller).
- You must provide accurate details about how the item was made, by whom, and where it is dispatched from.
- Shop members and production partners must be disclosed.
- You must use your own photographs or videos (no stock images or copied content).
- If AI is used to create or modify an item, you must disclose it in the listing.

b. What can’t be sold on Aleeha
- Illegal, counterfeit, or stolen goods.
- Items violating intellectual property rights.
- Unsafe, dangerous, or restricted products.
- Listings that do not actually offer a physical or digital product (e.g., referral codes, want ads, crowdfunding).
- Gift cards not issued by Aleeha.
- Dropshipping and unauthorized reselling.

c. Managing your Aleeha shop
- Provide honest and accurate shop information.
- Honour your Shop Policies.
- Ensure that all content (text, photos, videos) complies with Aleeha’s policies, including the Discrimination and Hateful Content Policy.
- Respect intellectual property rights of others.
- Do not facilitate off-platform transactions.
- Do not create duplicate shops or manipulate search, clicks, or sales.
- Do not coordinate pricing with other sellers.

d. Seller Standards
- You are responsible for complying with all applicable laws and regulations for the products you list.
- Maintain good service levels: on-time dispatch, timely communication, and resolution of issues.
- Respond to buyer messages promptly.
- Honour your commitments and shop policies.
- If you cannot fulfil an order, notify the buyer and cancel promptly.

e. Selling Fees
- Sellers may be charged for using Aleeha’s services, including listing, transaction, advertising, and other applicable fees.
- Fees are published separately in the Fees & Payments Policy.

2) Being a Member of the Aleeha Community
a. Creating and Uploading Content
- Content must not contain hateful, derogatory, or discriminatory material.
- Content must not include threats, harassment, or extortion.
- Content must not violate intellectual property rights.
- Content must not be false, deceptive, or misleading.
- Content must not include spam, private data, prohibited medical claims, or sexualization of minors.

b. Privacy and Protecting Personal Information
- You are responsible for protecting personal information of buyers.
- You must comply with all relevant data protection and privacy laws.
- You may only use buyer information for Aleeha-related transactions.
- You may not use buyer information for unsolicited marketing or off-platform purposes.

c. Communication Standards
i. Messages
- Messages may not be used for spam, harassment, or off-platform transactions.
- Do not interfere with another seller’s business.
- Do not share personal contact or financial information for off-platform deals.

ii. Forums/Teams
- Forums and Teams are public spaces and must follow Aleeha’s Community Policy.

iii. Communicating Cancellations
- If you cannot complete a transaction, notify the buyer and issue a full refund.
- EU/UK buyers may have a statutory right of withdrawal (14 days) except for custom or perishable items.
- Sellers must comply with cancellation, returns, and delivery laws relevant to their country and the buyer’s country.

3) Feedback, Cases, and Your Success
a. Reviews
- Buyers can leave reviews including text, star ratings, photos, or videos.
- Reviews must not contain obscene or prohibited content.
- Reviews must not undermine the integrity of the system (e.g., shilling or manipulation).

b. Aleeha’s Case System
- Buyers must first contact sellers to resolve issues.
- Sellers have 48 hours to respond before a case may be escalated.
- Aleeha may intervene to resolve disputes, including refunds.

c. Aleeha’s Purchase Protection for Sellers
- Sellers may be covered by Aleeha’s Purchase Protection Programme in certain disputes.
- If outside the programme, sellers may still be required to issue refunds.

d. Your Seller Account and Aleeha’s Terms
- Aleeha may limit visibility of shops or listings if risks are detected (fraud, chargebacks, policy violations).
- Search visibility may fluctuate based on performance, reviews, or unusual activity.
- Aleeha may require additional onboarding or verification.
- Accounts may be suspended or terminated for repeated violations.

By selecting “I agree” you confirm:
- You have read and accepted this Seller Policy and the Aleeha Terms of Use.
- Your products, listings, and practices comply with applicable laws and Aleeha policies.
`;

export const StepFive = ({
  policies = {
    terms: "/legal/terms",
    privacy: "/legal/privacy",
    seller: "/legal/seller-policies",
  },
  handleShopCreate,
}) => {
  const [checked, setChecked] = useState(false);
  const panelRef = useRef(null);

  //   const downloadTxt = () => {
  //     const blob = new Blob([AGREEMENT_MD], { type: "text/plain;charset=utf-8" });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "Aleeha_Seller_Agreement.txt";
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Agreement & consent
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Please review the terms below. You must agree to proceed.
        </p>

        {/* Agreement panel */}
        <div
          ref={panelRef}
          className="mt-5 rounded-xl border bg-white p-4 md:p-6 max-h-[60vh] overflow-auto leading-6 text-sm text-gray-800 whitespace-pre-wrap"
        >
          {AGREEMENT_MD}
        </div>

        {/* Policy links */}
        <div className="mt-3 text-sm text-gray-700">
          See also:{" "}
          <Link to={policies.terms} className="underline">
            Terms
          </Link>{" "}
          •{" "}
          <Link to={policies.privacy} className="underline">
            Privacy
          </Link>{" "}
          •{" "}
          <Link to={policies.seller} className="underline">
            Seller Policies
          </Link>
        </div>

        {/* Consent */}
        <label className="mt-6 flex items-start gap-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-gray-400 text-black focus:ring-black"
          />
          <p className="text-sm text-gray-800">
            I have read and agree to the Aleeha Seller Agreement and policies
            above. I confirm my items comply with applicable local laws.
          </p>
        </label>

        {/* Actions */}
        {/* <div className="mt-6 flex flex-col sm:flex-row gap-3"> */}
        {/* <button
            type="button"
            onClick={onBack}
            className="h-11 px-5 rounded-full border border-gray-300 bg-white hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            className="h-11 px-5 rounded-full border border-gray-300 bg-white hover:bg-gray-50"
          >
            Download agreement
          </button> */}
        {/* <div className="flex-1" />
          <button
            type="button"
            disabled={!checked}
            onClick={() =>
              onFinish({ agreed: true, at: new Date().toISOString() })
            }
            className={`h-11 px-6 rounded-full text-white font-semibold transition ${
              checked
                ? "bg-[#2F5651] hover:opacity-90"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Agree & Finish
          </button>
        </div> */}

        <div className="flex justify-end mt-6">
          <button
            disabled={!checked}
            className={`rounded-full bg-black py-3 px-6 ${
              checked
                ? "bg-[#2F5651] hover:opacity-90 hover:shadow-lg hover:shadow-black/40 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => handleShopCreate()}
          >
            <p className="text-md font-semibold text-white"> Agree & Finish</p>
          </button>
        </div>

        {/* Small note */}
        <p className="mt-3 text-xs text-gray-500">
          Your acceptance is recorded electronically with timestamp and IP for
          compliance purposes.
        </p>
      </div>
    </div>
  );
};
