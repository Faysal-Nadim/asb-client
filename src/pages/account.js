import React from "react";
import {
  BasicSelectInput,
  BasicTextInput,
} from "../components/input/basictext";

/**
 * @author
 * @function Account
 **/

export const Account = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-[1380px] mx-auto py-8">
      <div>
        <h2 className="text-lg font-semibold">About You</h2>
        <div className="border rounded-lg border-gray-300 bg-white p-4 mt-2">
          <div className="w-2/3">
            <BasicSelectInput
              label={"Country of residence"}
              options={["Bangladesh", "India", "Pakistan", "Sri Lanka"]}
              disabled={true}
            />

            <div className="grid grid-cols-2 items-center gap-4">
              <BasicTextInput
                label={"First name"}
                placeholder={"Enter your first name"}
              />

              <BasicTextInput
                label={"Last name"}
                placeholder={"Enter your last name"}
              />
            </div>

            <div>
              <label className="text-black font-semibold text-md mb-2 block">
                Short bio
              </label>
              <textarea
                placeholder={"Tell us about yourself"}
                className="w-full border border-gray-300 rounded-lg p-2.5"
              />
            </div>
          </div>

          <div className="flex justify-start mt-2">
            <div
              // onClick={handleSaveAndContinue}
              className="rounded-full bg-black py-2 px-4 hover:shadow-lg hover:shadow-black/40 cursor-pointer"
            >
              <p className="text-md font-medium text-white">Save Changes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Password</h2>
        <div className="border rounded-lg border-gray-300 bg-white p-4 mt-2">
          <div className="w-2/3">
            <BasicTextInput
              label={"Current Password"}
              placeholder={"Enter your current password"}
            />

            <BasicTextInput
              label={"New Password"}
              placeholder={"Enter your new password"}
            />

            <BasicTextInput
              label={"Confirm New Password"}
              placeholder={"Enter your new password again"}
            />
          </div>

          <div className="flex justify-start">
            <div
              // onClick={handleSaveAndContinue}
              className="rounded-full bg-black py-2 px-4 hover:shadow-lg hover:shadow-black/40 cursor-pointer"
            >
              <p className="text-md font-medium text-white">Change Password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
