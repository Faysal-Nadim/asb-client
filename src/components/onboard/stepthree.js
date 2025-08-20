import React, { useState } from "react";
import { BasicSelectInput, BasicTextInput, DOBInput } from "../input/basictext";

/**
 * @author
 * @function StepThree
 **/

const options = [
  {
    id: "individual",
    title: "Individual",
    description: "An individual without a business license.",
  },
  {
    id: "proprietorship",
    title: "Sole proprietorship",
    description:
      "Most sellers on Aleeha fall into this category.\n(A sole trader with a business license.)",
  },
  {
    id: "business",
    title: "Incorporated business",
    description: "A registered legal entity",
  },
];

export const StepThree = (props) => {
  const [selected, setSelected] = useState("proprietorship");

  const [dob, setDob] = useState({ day: "", month: "", year: "" });

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
              onClick={() => setSelected(option.id)}
              className={`cursor-pointer border rounded-lg p-4 transition flex items-start gap-3 ${
                selected === option.id
                  ? "border-black ring-1 ring-black"
                  : "border-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${
                  selected === option.id ? "border-black" : "border-gray-400"
                }`}
              >
                {selected === option.id && (
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

      {selected === "individual" && (
        <IndividualInfoForm dob={dob} setDob={setDob} />
      )}

      {selected === "proprietorship" && (
        <ProprietorshipInfoForm dob={dob} setDob={setDob} />
      )}

      {selected === "business" && (
        <BusinessInfoForm dob={dob} setDob={setDob} />
      )}

      {/* <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
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
            options={["Bangladesh", "India", "Pakistan", "Sri Lanka"]}
          />

          <div className="grid grid-cols-2 items-center gap-4">
            <BasicTextInput
              label={"First name"}
              isRequired={true}
              placeholder={"Enter your first name"}
            />

            <BasicTextInput
              label={"Last name"}
              isRequired={true}
              placeholder={"Enter your last name"}
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

            <BasicTextInput label={"Street address"} isRequired={true} />

            <div className="grid grid-cols-2 gap-4">
              <BasicTextInput label={"City"} isRequired={true} />
              <BasicTextInput label={"Postal code"} isRequired={true} />
            </div>

            <BasicTextInput label={"Phone number"} isRequired={true} />
          </div>
        </div>
      </div> */}

      <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
        <h2 className="text-lg font-semibold mb-6">
          Add your bank information
        </h2>

        <div className="flex flex-col gap-2">
          <p className="font-medium">Name of the account holder</p>
          <p>Faysal Jamil Nadim</p>
          <p className="text-gray-600 text-sm">
            Make sure the name on your bank account matches the name you entered
            above.
          </p>
        </div>

        <div className="w-2/3 mt-6">
          <BasicTextInput label={"Bank name"} isRequired={true} />

          <BasicTextInput label={"Account number"} isRequired={true} />

          <BasicTextInput label={"Branch"} isRequired={true} />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput label={"Routing number"} isRequired={true} />

            <BasicTextInput label={"SWIFT/BIC code"} isRequired={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

const IndividualInfoForm = ({ dob, setDob }) => {
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
          options={["Bangladesh", "India", "Pakistan", "Sri Lanka"]}
        />

        <div className="grid grid-cols-2 items-center gap-4">
          <BasicTextInput
            label={"First name"}
            isRequired={true}
            placeholder={"Enter your first name"}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
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

          <BasicTextInput label={"Street address"} isRequired={true} />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput label={"City"} isRequired={true} />
            <BasicTextInput label={"Postal code"} isRequired={true} />
          </div>

          <BasicTextInput label={"Phone number"} isRequired={true} />
        </div>
      </div>
    </div>
  );
};

const ProprietorshipInfoForm = ({ dob, setDob }) => {
  return (
    <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
      <h2 className="text-lg font-semibold">
        Tell us a bit about your business
      </h2>
      <p className="text-gray-700 text-sm mt-4">
        For compliance purposes, we may verify your identity with a secure
        third-party service.
        <br /> This information will never be displayed publicly on Aleeha.
      </p>

      <div className="mt-4 w-2/3">
        <BasicSelectInput
          label={"Country of residence"}
          isRequired={true}
          options={["Bangladesh", "India", "Pakistan", "Sri Lanka"]}
        />

        <div className="grid grid-cols-2 items-center gap-4">
          <BasicTextInput
            label={"First name"}
            isRequired={true}
            placeholder={"Enter your first name"}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
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

          <BasicTextInput label={"Street address"} isRequired={true} />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput label={"City"} isRequired={true} />
            <BasicTextInput label={"Postal code"} isRequired={true} />
          </div>

          <BasicTextInput label={"Phone number"} isRequired={true} />
        </div>
      </div>
    </div>
  );
};

const BusinessInfoForm = ({ dob, setDob }) => {
  return (
    <div className="w-full mx-auto border rounded-lg p-6 md:p-8 bg-white my-8">
      <h2 className="text-lg font-semibold">
        Tell us a bit about your company
      </h2>
      <p className="text-gray-700 text-sm mt-4">
        For compliance purposes, we may verify your identity with a secure
        third-party service.
        <br /> This information will never be displayed publicly on Aleeha.
      </p>

      <div className="mt-4 w-2/3">
        <BasicSelectInput
          label={"Country of residence"}
          isRequired={true}
          options={["Bangladesh", "India", "Pakistan", "Sri Lanka"]}
        />

        <div className="grid grid-cols-2 items-center gap-4">
          <BasicTextInput
            label={"First name"}
            isRequired={true}
            placeholder={"Enter your first name"}
          />

          <BasicTextInput
            label={"Last name"}
            isRequired={true}
            placeholder={"Enter your last name"}
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

          <BasicTextInput label={"Street address"} isRequired={true} />

          <div className="grid grid-cols-2 gap-4">
            <BasicTextInput label={"City"} isRequired={true} />
            <BasicTextInput label={"Postal code"} isRequired={true} />
          </div>

          <BasicTextInput label={"Phone number"} isRequired={true} />
        </div>
      </div>
    </div>
  );
};
