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
    const { day, month, year } = dob;

    // only set when all are present
    if (!day || !month || !year) return;

    const dobString = new Date(`${year}-${month}-${day}`);
    if (Number.isNaN(dobString.getTime())) return;

    setOwnerField("dob", dobString);
  }, [dob, setOwnerField]);

  const [errors, setErrors] = useState({});

  const isEmpty = (v) =>
    v === null || v === undefined || (typeof v === "string" && v.trim() === "");

  const validateStepThree = () => {
    const next = {};

    // ---- Payment (always required in StepThree) ----
    if (isEmpty(paymentFormData.accountHolder))
      next.accountHolder = "Account name is required";
    if (isEmpty(paymentFormData.bankName))
      next.bankName = "Bank name is required";
    if (isEmpty(paymentFormData.accountNumber))
      next.accountNumber = "Account number is required";
    if (isEmpty(paymentFormData.branch)) next.branch = "Branch is required";
    if (isEmpty(paymentFormData.routingNumber))
      next.routingNumber = "Routing number is required";
    if (isEmpty(paymentFormData.swiftCode))
      next.swiftCode = "SWIFT/BIC code is required";

    // ---- Owner (required for all shop types shown in StepThree forms) ----
    const needOwner =
      shopType === "INDIVIDUAL" ||
      shopType === "SOLE_PROPRIETOR" ||
      shopType === "LEGAL_ENTITY";

    if (needOwner) {
      if (isEmpty(ownerFormData.firstName))
        next.firstName = "First name is required";
      if (isEmpty(ownerFormData.lastName))
        next.lastName = "Last name is required";
      if (isEmpty(ownerFormData.country))
        next.ownerCountry = "Country of residence is required";
      if (
        !ownerFormData.dob ||
        Number.isNaN(new Date(ownerFormData.dob).getTime())
      )
        next.dob = "Date of birth is required";

      if (isEmpty(ownerFormData.street))
        next.ownerStreet = "Street address is required";
      if (isEmpty(ownerFormData.city)) next.ownerCity = "City is required";
      if (isEmpty(ownerFormData.zip)) next.ownerZip = "Postal code is required";
      if (isEmpty(ownerFormData.phone))
        next.ownerPhone = "Phone number is required";
    }

    // ---- Legal (required only for proprietorship / legal entity) ----
    const needLegal =
      shopType === "SOLE_PROPRIETOR" || shopType === "LEGAL_ENTITY";

    if (needLegal) {
      if (isEmpty(legalFormData.legalName))
        next.legalName = "Business name is required";

      if (isEmpty(legalFormData.country))
        next.legalCountry = "Business country is required";
      if (isEmpty(legalFormData.street))
        next.legalStreet = "Business street address is required";
      if (isEmpty(legalFormData.city))
        next.legalCity = "Business city is required";
      if (isEmpty(legalFormData.zip))
        next.legalZip = "Business postal code is required";

      if (isEmpty(legalFormData.registrationNo))
        next.registrationNo = "Business registration number is required";

      // only enforce consent if you want it required
      if (!legalFormData.consented)
        next.consented = "You must accept compliance terms";
    }

    setErrors(next);

    // scroll to first error (nice UX)
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      const el = document.querySelector(`[data-err="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  };

  const handleSaveAndContinue = () => {
    const ok = validateStepThree();
    if (!ok) return;

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

  // const handleSaveAndContinue = () => {
  //   setSteps((prevSteps) =>
  //     prevSteps.map((step, index) =>
  //       index === 2
  //         ? { ...step, status: "done" }
  //         : index === 3
  //         ? { ...step, status: "current" }
  //         : step
  //     )
  //   );
  //   navigate("/merchant/onboarding?step=3");
  // };

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
          errors={errors}
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
          errors={errors}
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
          errors={errors}
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
            errorText={errors.accountHolder}
          />
          <BasicTextInput
            label={"Bank name"}
            isRequired={true}
            value={paymentFormData.bankName}
            onChange={(e) => setPaymentField("bankName", e.target.value)}
            errorText={errors.bankName}
          />

          <BasicTextInput
            label={"Account number"}
            isRequired={true}
            value={paymentFormData.accountNumber}
            onChange={(e) => setPaymentField("accountNumber", e.target.value)}
            errorText={errors.accountNumber}
          />

          <BasicTextInput
            label={"Branch"}
            isRequired={true}
            value={paymentFormData.branch}
            onChange={(e) => setPaymentField("branch", e.target.value)}
            errorText={errors.branch}
          />
          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"Routing number"}
              isRequired={true}
              value={paymentFormData.routingNumber}
              onChange={(e) => setPaymentField("routingNumber", e.target.value)}
              errorText={errors.routingNumber}
            />

            <BasicTextInput
              label={"SWIFT/BIC code"}
              isRequired={true}
              value={paymentFormData.swiftCode}
              onChange={(e) => setPaymentField("swiftCode", e.target.value)}
              errorText={errors.swiftCode}
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

const IndividualInfoForm = ({
  dob,
  setDob,
  ownerFormData,
  setOwnerField,
  errors,
}) => {
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
          errorText={errors.ownerCountry}
        />

        <div className="grid grid-cols-2 items-center gap-4">
          <BasicTextInput
            label={"First name"}
            isRequired={true}
            placeholder={"Enter your first name"}
            value={ownerFormData.firstName}
            onChange={(e) => setOwnerField("firstName", e.target.value)}
            errorText={errors.firstName}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
            value={ownerFormData.lastName}
            onChange={(e) => setOwnerField("lastName", e.target.value)}
            errorText={errors.lastName}
          />
        </div>

        <div>
          <DOBInput
            value={dob}
            onChange={setDob}
            startYear={1950}
            endYear={new Date().getFullYear()}
            error={errors.dob}
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
            errorText={errors.ownerStreet}
          />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"City"}
              isRequired={true}
              value={ownerFormData.city}
              onChange={(e) => setOwnerField("city", e.target.value)}
              errorText={errors.ownerCity}
            />
            <BasicTextInput
              label={"Postal code"}
              isRequired={true}
              value={ownerFormData.zip}
              onChange={(e) => setOwnerField("zip", e.target.value)}
              errorText={errors.ownerZip}
            />
          </div>

          <BasicTextInput
            label={"Phone number"}
            isRequired={true}
            value={ownerFormData.phone}
            onChange={(e) => setOwnerField("phone", e.target.value)}
            errorText={errors.ownerPhone}
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
  errors,
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
          errorText={errors.legalName}
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
          errorText={errors.legalCountry}
        />

        <BasicTextInput
          label={"Street address"}
          isRequired={true}
          value={legalFormData.street}
          onChange={(e) => setLegalField("street", e.target.value)}
          errorText={errors.legalStreet}
        />

        <div className="grid grid-cols-2 gap-4">
          <BasicTextInput
            label={"City"}
            isRequired={true}
            value={legalFormData.city}
            onChange={(e) => setLegalField("city", e.target.value)}
            errorText={errors.legalCity}
          />
          <BasicTextInput
            label={"Postal code"}
            isRequired={true}
            value={legalFormData.zip}
            onChange={(e) => setLegalField("zip", e.target.value)}
            errorText={errors.legalZip}
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
          errorText={errors.registrationNo}
        />

        <ComplianceCheckbox
          checked={legalFormData.consented}
          onChange={(val) => setLegalField("consented", val)}
          errorText={errors.consented}
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
            errorText={errors.firstName}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
            value={ownerFormData.lastName}
            onChange={(e) => setOwnerField("lastName", e.target.value)}
            errorText={errors.lastName}
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
          errorText={errors.ownerCountry}
        />

        <div>
          <DOBInput
            value={dob}
            onChange={setDob}
            startYear={1950}
            endYear={new Date().getFullYear()}
            error={errors.dob}
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
            errorText={errors.ownerStreet}
          />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"City"}
              isRequired={true}
              value={ownerFormData.city}
              onChange={(e) => setOwnerField("city", e.target.value)}
              errorText={errors.ownerCity}
            />
            <BasicTextInput
              label={"Postal code"}
              isRequired={true}
              value={ownerFormData.zip}
              onChange={(e) => setOwnerField("zip", e.target.value)}
              errorText={errors.ownerZip}
            />
          </div>

          <BasicTextInput
            label={"Phone number"}
            isRequired={true}
            value={ownerFormData.phone}
            onChange={(e) => setOwnerField("phone", e.target.value)}
            errorText={errors.ownerPhone}
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
  errors,
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
          errorText={errors.legalName}
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
          errorText={errors.legalCountry}
        />

        <BasicTextInput
          label={"Street address"}
          isRequired={true}
          value={legalFormData.street}
          onChange={(e) => setLegalField("street", e.target.value)}
          errorText={errors.legalStreet}
        />

        <div className="grid grid-cols-2 gap-4">
          <BasicTextInput
            label={"City"}
            isRequired={true}
            value={legalFormData.city}
            onChange={(e) => setLegalField("city", e.target.value)}
            errorText={errors.legalCity}
          />
          <BasicTextInput
            label={"Postal code"}
            isRequired={true}
            value={legalFormData.zip}
            onChange={(e) => setLegalField("zip", e.target.value)}
            errorText={errors.legalZip}
          />
        </div>

        <BasicTextInput
          label={"Phone number"}
          isRequired={true}
          value={legalFormData.phone}
          onChange={(e) => setLegalField("phone", e.target.value)}
          errorText={errors.legalPhone}
        />

        <BasicTextInput
          label={"Business registration number"}
          isRequired={true}
          value={legalFormData.registrationNo}
          onChange={(e) => setLegalField("registrationNo", e.target.value)}
          errorText={errors.registrationNo}
        />

        <ComplianceCheckbox
          checked={legalFormData.consented}
          onChange={(val) => setLegalField("consented", val)}
          errorText={errors.consented}
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
            errorText={errors.firstName}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
            value={ownerFormData.lastName}
            onChange={(e) => setOwnerField("lastName", e.target.value)}
            errorText={errors.lastName}
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
          errorText={errors.ownerCountry}
        />

        <div>
          <DOBInput
            value={dob}
            onChange={setDob}
            startYear={1950}
            endYear={new Date().getFullYear()}
            error={errors.dob}
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
            errorText={errors.ownerStreet}
          />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput
              label={"City"}
              isRequired={true}
              value={ownerFormData.city}
              onChange={(e) => setOwnerField("city", e.target.value)}
              errorText={errors.ownerCity}
            />
            <BasicTextInput
              label={"Postal code"}
              isRequired={true}
              value={ownerFormData.zip}
              onChange={(e) => setOwnerField("zip", e.target.value)}
              errorText={errors.ownerZip}
            />
          </div>

          <BasicTextInput
            label={"Phone number"}
            isRequired={true}
            value={ownerFormData.phone}
            onChange={(e) => setOwnerField("phone", e.target.value)}
            errorText={errors.ownerPhone}
          />
        </div>
      </div>
    </div>
  );
};
