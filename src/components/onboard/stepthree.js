import React, { useEffect, useState } from "react";
import { BasicSelectInput, BasicTextInput, DOBInput } from "../input/basictext";
import ComplianceCheckbox from "../input/checkbox";
import { useNavigate } from "react-router-dom";

/**
 * @author
 * @function StepThree
 **/

const options = [
  {
    id: "INDIVIDUAL",
    title: "Individual",
    description: "An individual without a business license.",
  },
  {
    id: "SOLE_PROPRIETOR",
    title: "Sole proprietorship",
    description:
      "Most sellers on Aleeha fall into this category.\n(A sole trader with a business license.)",
  },
  {
    id: "LEGAL_ENTITY",
    title: "Incorporated business",
    description: "A registered legal entity",
  },
];

export const StepThree = ({
  setSteps,
  ownerFormData,
  setOwnerField,
  legalFormData,
  setLegalField,
  paymentFormData,
  setPaymentField,
  shopType,
  setShopType,
}) => {
  const navigate = useNavigate();

  const [dob, setDob] = useState({ day: "", month: "", year: "" });

  useEffect(() => {
    const handleDobChange = () => {
      const dobString = new Date(`${dob.year}-${dob.month}-${dob.day}`);
      setOwnerField("dob", dobString);
    };
    handleDobChange();
  }, [dob, setOwnerField]);

  const handleSaveAndContinue = () => {
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === 2
          ? { ...step, status: "done" }
          : index === 3
          ? { ...step, status: "current" }
          : step
      )
    );
    navigate("/merchant/onboarding?step=3");
  };

  return (
    <div className="p-8 max-w-[1080px] mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-semibold ">Billing and Payment</h2>
        <p className="text-gray-700">
          Let us know about your billing and payment preferences.
        </p>
      </div>

      <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
        <div>
          <h2 className="text-lg font-semibold">
            What type of seller are you?
          </h2>
          <p className="text-gray-700 text-sm">
            Most sellers fall into the proprietorship category when they first
            join our platform.
          </p>
        </div>

        <div className="space-y-4 mt-6 w-2/3">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => setShopType(option.id)}
              className={`cursor-pointer border rounded-lg p-4 transition flex items-start gap-3 ${
                shopType === option.id
                  ? "border-black ring-1 ring-black"
                  : "border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${
                  shopType === option.id ? "border-black" : "border-gray-400"
                }`}
              >
                {shopType === option.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{option.title}</h3>
                <pre className="text-sm text-gray-600">
                  {option.description}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {shopType === "INDIVIDUAL" && (
        <IndividualInfoForm
          dob={dob}
          setDob={setDob}
          ownerFormData={ownerFormData}
          setOwnerField={setOwnerField}
        />
      )}

      {shopType === "SOLE_PROPRIETOR" && (
        <ProprietorshipInfoForm
          dob={dob}
          setDob={setDob}
          ownerFormData={ownerFormData}
          setOwnerField={setOwnerField}
          legalFormData={legalFormData}
          setLegalField={setLegalField}
        />
      )}

      {shopType === "LEGAL_ENTITY" && (
        <BusinessInfoForm
          dob={dob}
          setDob={setDob}
          ownerFormData={ownerFormData}
          setOwnerField={setOwnerField}
          legalFormData={legalFormData}
          setLegalField={setLegalField}
        />
      )}

      <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
        <h2 className="text-lg font-semibold mb-6">
          Add your bank information
        </h2>

        <div className="w-2/3 mt-6">
          <BasicTextInput
            label={"Account name"}
            isRequired={true}
            value={paymentFormData.accountHolder}
            onChange={(e) => setPaymentField("accountHolder", e.target.value)}
          />
          <BasicTextInput
            label={"Bank name"}
            isRequired={true}
            value={paymentFormData.bankName}
            onChange={(e) => setPaymentField("bankName", e.target.value)}
          />

          <BasicTextInput
            label={"Account number"}
            isRequired={true}
            value={paymentFormData.accountNumber}
            onChange={(e) => setPaymentField("accountNumber", e.target.value)}
          />

          <BasicTextInput
            label={"Branch"}
            isRequired={true}
            value={paymentFormData.branch}
            onChange={(e) => setPaymentField("branch", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"Routing number"}
              isRequired={true}
              value={paymentFormData.routingNumber}
              onChange={(e) => setPaymentField("routingNumber", e.target.value)}
            />

            <BasicTextInput
              label={"SWIFT/BIC code"}
              isRequired={true}
              value={paymentFormData.swiftCode}
              onChange={(e) => setPaymentField("swiftCode", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div
          onClick={handleSaveAndContinue}
          className="rounded-full bg-black py-3 px-6 hover:shadow-lg hover:shadow-black/40 cursor-pointer"
        >
          <p className="text-md font-semibold text-white">Save & continue</p>
        </div>
      </div>
    </div>
  );
};

const IndividualInfoForm = ({ dob, setDob, ownerFormData, setOwnerField }) => {
  return (
    <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
      <h2 className="text-lg font-semibold">Tell us a bit about yourself</h2>
      <p className="text-gray-700 text-sm mt-4">
        For compliance purposes, we may verify your identity with a secure
        third-party service.
        <br /> This information will never be displayed publicly on Aleeha.
      </p>

      <div className="mt-4 w-2/3">
        <BasicSelectInput
          label={"Country of residence"}
          isRequired={true}
          options={[
            "Select Country",
            "Bangladesh",
            "India",
            "Pakistan",
            "Sri Lanka",
          ]}
          value={ownerFormData.country}
          onChange={(e) => setOwnerField("country", e.target.value)}
        />

        <div className="grid grid-cols-2 items-center gap-4">
          <BasicTextInput
            label={"First name"}
            isRequired={true}
            placeholder={"Enter your first name"}
            value={ownerFormData.firstName}
            onChange={(e) => setOwnerField("firstName", e.target.value)}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
            value={ownerFormData.lastName}
            onChange={(e) => setOwnerField("lastName", e.target.value)}
          />
        </div>

        <div>
          <DOBInput
            value={dob}
            onChange={setDob}
            startYear={1950}
            endYear={new Date().getFullYear()}
            error={null}
          />
        </div>

        <div className="mt-4">
          <div className="mb-4">
            <p className="font-semibold text-md">Address</p>
            <p className="text-sm text-gray-600">
              Address should match your identification documents.
            </p>
          </div>

          <BasicTextInput
            label={"Street address"}
            isRequired={true}
            value={ownerFormData.street}
            onChange={(e) => setOwnerField("street", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"City"}
              isRequired={true}
              value={ownerFormData.city}
              onChange={(e) => setOwnerField("city", e.target.value)}
            />
            <BasicTextInput
              label={"Postal code"}
              isRequired={true}
              value={ownerFormData.zip}
              onChange={(e) => setOwnerField("zip", e.target.value)}
            />
          </div>

          <BasicTextInput
            label={"Phone number"}
            isRequired={true}
            value={ownerFormData.phone}
            onChange={(e) => setOwnerField("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const ProprietorshipInfoForm = ({
  dob,
  setDob,
  ownerFormData,
  setOwnerField,
  legalFormData,
  setLegalField,
}) => {
  return (
    <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
      <h2 className="text-lg font-semibold">
        Tell us a bit about your business
      </h2>
      <p className="text-gray-700 text-sm mt-4">
        For compliance purposes, we may verify your business information with a
        secure third-party service.
        <br /> Don’t worry, the information you enter here won’t be used
        publicly.
      </p>

      <div className="mt-4 w-2/3">
        <BasicTextInput
          label={"Business name (As registered)"}
          isRequired={true}
          value={legalFormData.legalName}
          onChange={(e) => setLegalField("legalName", e.target.value)}
        />

        <div className="mt-4">
          <div className="mb-4">
            <p className="font-semibold text-md">Business address</p>
            <p className="text-sm text-gray-600">
              Address should match your Trade License.
            </p>
          </div>
        </div>

        <BasicSelectInput
          label={"Country"}
          isRequired={true}
          options={[
            "Select Country",
            "Bangladesh",
            "India",
            "Pakistan",
            "Sri Lanka",
          ]}
          value={legalFormData.country}
          onChange={(e) => setLegalField("country", e.target.value)}
        />

        <BasicTextInput
          label={"Street address"}
          isRequired={true}
          value={legalFormData.street}
          onChange={(e) => setLegalField("street", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <BasicTextInput
            label={"City"}
            isRequired={true}
            value={legalFormData.city}
            onChange={(e) => setLegalField("city", e.target.value)}
          />
          <BasicTextInput
            label={"Postal code"}
            isRequired={true}
            value={legalFormData.zip}
            onChange={(e) => setLegalField("zip", e.target.value)}
          />
        </div>

        <BasicTextInput
          label={"Phone number"}
          value={legalFormData.phone}
          onChange={(e) => setLegalField("phone", e.target.value)}
        />

        <BasicTextInput
          label={"Business registration number"}
          isRequired={true}
          value={legalFormData.registrationNo}
          onChange={(e) => setLegalField("registrationNo", e.target.value)}
        />

        <ComplianceCheckbox
          checked={legalFormData.consented}
          onChange={(val) => setLegalField("consented", val)}
        />
      </div>

      <div className="mt-6 w-2/3">
        <div className="mb-4 border-t border-gray-300">
          <p className="font-semibold text-md mt-6">
            Who is the primary shop owner for the business?
          </p>
          <p className="text-sm text-gray-600 mt-4">
            We may verify this information with a secure third-party service.
            Rest assured, this info won’t ever be shared outside of this secure
            service.
          </p>
        </div>

        <p className="font-semibold text-lg">Shop owner’s name</p>

        <div className="grid grid-cols-2 items-center gap-4 mt-4">
          <BasicTextInput
            label={"First name"}
            isRequired={true}
            placeholder={"Enter your first name"}
            value={ownerFormData.firstName}
            onChange={(e) => setOwnerField("firstName", e.target.value)}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
            value={ownerFormData.lastName}
            onChange={(e) => setOwnerField("lastName", e.target.value)}
          />
        </div>

        <p className="font-semibold text-lg mb-6 mt-4">
          Shop owner’s home address
        </p>

        <BasicSelectInput
          label={"Country of residence"}
          isRequired={true}
          options={[
            "Select Country",
            "Bangladesh",
            "India",
            "Pakistan",
            "Sri Lanka",
          ]}
          value={ownerFormData.country}
          onChange={(e) => setOwnerField("country", e.target.value)}
        />

        <div>
          <DOBInput
            value={dob}
            onChange={setDob}
            startYear={1950}
            endYear={new Date().getFullYear()}
            error={null}
            label="Shop owner's date of birth"
          />
        </div>

        <div className="mt-4">
          <div className="mb-4">
            <p className="font-semibold text-md">Address</p>
            <p className="text-sm text-gray-600">
              Address should match your identification documents.
            </p>
          </div>

          <BasicTextInput
            label={"Street address"}
            isRequired={true}
            value={ownerFormData.street}
            onChange={(e) => setOwnerField("street", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"City"}
              isRequired={true}
              value={ownerFormData.city}
              onChange={(e) => setOwnerField("city", e.target.value)}
            />
            <BasicTextInput
              label={"Postal code"}
              isRequired={true}
              value={ownerFormData.zip}
              onChange={(e) => setOwnerField("zip", e.target.value)}
            />
          </div>

          <BasicTextInput
            label={"Phone number"}
            isRequired={true}
            value={ownerFormData.phone}
            onChange={(e) => setOwnerField("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const BusinessInfoForm = ({
  dob,
  setDob,
  legalFormData,
  setLegalField,
  ownerFormData,
  setOwnerField,
}) => {
  return (
    <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
      <h2 className="text-lg font-semibold">
        Tell us a bit about your company
      </h2>
      <p className="text-gray-700 text-sm mt-4">
        For compliance purposes, we may verify your company information with a
        secure third-party service.
        <br /> Don’t worry, the information you enter here won’t be used
        publicly.
      </p>

      <div className="mt-4 w-2/3">
        <BasicTextInput
          label={"Legal entity name"}
          isRequired={true}
          value={legalFormData.legalName}
          onChange={(e) => setLegalField("legalName", e.target.value)}
        />

        <div className="mt-4">
          <div className="mb-4">
            <p className="font-semibold text-md">Company address</p>
            <p className="text-sm text-gray-600">
              Address should match your Trade License/Incorporation documents.
            </p>
          </div>
        </div>

        <BasicSelectInput
          label={"Country"}
          isRequired={true}
          options={[
            "Select Country",
            "Bangladesh",
            "India",
            "Pakistan",
            "Sri Lanka",
          ]}
          value={legalFormData.country}
          onChange={(e) => setLegalField("country", e.target.value)}
        />

        <BasicTextInput
          label={"Street address"}
          isRequired={true}
          value={legalFormData.street}
          onChange={(e) => setLegalField("street", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <BasicTextInput
            label={"City"}
            isRequired={true}
            value={legalFormData.city}
            onChange={(e) => setLegalField("city", e.target.value)}
          />
          <BasicTextInput
            label={"Postal code"}
            isRequired={true}
            value={legalFormData.zip}
            onChange={(e) => setLegalField("zip", e.target.value)}
          />
        </div>

        <BasicTextInput
          label={"Phone number"}
          isRequired={true}
          value={legalFormData.phone}
          onChange={(e) => setLegalField("phone", e.target.value)}
        />

        <BasicTextInput
          label={"Business registration number"}
          isRequired={true}
          value={legalFormData.registrationNo}
          onChange={(e) => setLegalField("registrationNo", e.target.value)}
        />

        <ComplianceCheckbox
          checked={legalFormData.consented}
          onChange={(val) => setLegalField("consented", val)}
        />
      </div>

      <div className="mt-6 w-2/3">
        <div className="mb-4 border-t border-gray-300">
          <p className="font-semibold text-md mt-6">
            Who is the primary shop owner for the business?
          </p>
          <p className="text-sm text-gray-600 mt-4">
            We may verify this information with a secure third-party service.
            Rest assured, this info won’t ever be shared outside of this secure
            service.
          </p>
        </div>

        <p className="font-semibold text-lg">Shop owner’s name</p>

        <div className="grid grid-cols-2 items-center gap-4 mt-4">
          <BasicTextInput
            label={"First name"}
            isRequired={true}
            placeholder={"Enter your first name"}
            value={ownerFormData.firstName}
            onChange={(e) => setOwnerField("firstName", e.target.value)}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
            value={ownerFormData.lastName}
            onChange={(e) => setOwnerField("lastName", e.target.value)}
          />
        </div>

        <p className="font-semibold text-lg mb-6 mt-4">
          Shop owner’s home address
        </p>

        <BasicSelectInput
          label={"Country of residence"}
          isRequired={true}
          options={[
            "Select Country",
            "Bangladesh",
            "India",
            "Pakistan",
            "Sri Lanka",
          ]}
          value={ownerFormData.country}
          onChange={(e) => setOwnerField("country", e.target.value)}
        />

        <div>
          <DOBInput
            value={dob}
            onChange={setDob}
            startYear={1950}
            endYear={new Date().getFullYear()}
            error={null}
            label="Shop owner's date of birth"
          />
        </div>

        <div className="mt-4">
          <div className="mb-4">
            <p className="font-semibold text-md">Address</p>
            <p className="text-sm text-gray-600">
              Address should match your identification documents.
            </p>
          </div>

          <BasicTextInput
            label={"Street address"}
            isRequired={true}
            value={ownerFormData.street}
            onChange={(e) => setOwnerField("street", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"City"}
              isRequired={true}
              value={ownerFormData.city}
              onChange={(e) => setOwnerField("city", e.target.value)}
            />
            <BasicTextInput
              label={"Postal code"}
              isRequired={true}
              value={ownerFormData.zip}
              onChange={(e) => setOwnerField("zip", e.target.value)}
            />
          </div>

          <BasicTextInput
            label={"Phone number"}
            isRequired={true}
            value={ownerFormData.phone}
            onChange={(e) => setOwnerField("phone", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
