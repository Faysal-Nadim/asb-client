import React, { useEffect, useState } from "react";
import {
  BasicSelectInput,
  BasicTextInput,
  DOBInput,
} from "../../components/input/basictext";
import { useDispatch, useSelector } from "react-redux";
import { CDN } from "../../redux/helpers/urlConfig";
import { ProfileImgModal } from "../../components/modal/profileimg";
import { changeUserPassword, updateUserProfile } from "../../redux/actions";

/**
 * @author
 * @function Account
 **/

export const Account = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const [imgModal, setImgModal] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [country, setCountry] = useState(user?.country || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [buttonStatus, setButtonStatus] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  // Validate new password and confirm password match
  useEffect(() => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
    } else {
      setPasswordError(null);
    }
  }, [newPassword, confirmNewPassword]);

  // Parse and set DOB on component mount
  useEffect(() => {
    const parseDOB = (dobString) => {
      if (!dobString) return { day: "", month: "", year: "" };
      const date = new Date(dobString);
      return {
        day: String(date.getDate()),
        month: String(date.getMonth() + 1).padStart(2, "0"),
        year: String(date.getFullYear()),
      };
    };

    setDob(parseDOB(user?.birthday));
  }, [user?.birthday]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Check if any profile field has changed
  useEffect(() => {
    if (
      name === user?.name &&
      gender === user?.gender &&
      country === user?.country &&
      bio === user?.bio &&
      dob.day === String(new Date(user?.birthday).getDate()) &&
      dob.month ===
        String(new Date(user?.birthday).getMonth() + 1).padStart(2, "0") &&
      dob.year === String(new Date(user?.birthday).getFullYear())
    ) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [name, gender, country, bio, dob, user]);

  // Handle profile update submission
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const data = {
      name,
      gender,
      birthday:
        dob.year && dob.month && dob.day
          ? `${dob.year}-${dob.month}-${dob.day}`
          : null,
      country,
      bio,
    };
    dispatch(updateUserProfile(data));
  };

  // Handle password change submission
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordError) return;
    if (!currentPassword) return;
    // Dispatch password change action here
    dispatch(changeUserPassword({ currentPassword, newPassword }));
  };

  return (
    <div className="max-w-[1024px] mx-auto py-8 px-4">
      <div>
        <h2 className="text-lg font-semibold">About You</h2>
        <div className="border rounded-lg border-gray-300 bg-white p-4 mt-2">
          <div className="flex items-center gap-4 my-4">
            <div className="relative h-24 w-24">
              {auth?.user?.img ? (
                <img
                  src={`${CDN}${auth?.user?.img?.path}`}
                  className="h-24 w-24 rounded-full"
                  alt="User Avatar"
                />
              ) : (
                <img
                  src="https://placehold.co/200x200"
                  className="h-24 w-24 rounded-full"
                  alt="User Avatar"
                />
              )}

              <div
                onClick={() => setImgModal(true)}
                className="absolute bottom-0 right-0 bg-black bg-opacity-70 p-2 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h4l2-3h6l2 3h4v12H3V7z"
                  />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mt-2">{auth?.user?.name}</h2>
              <p className="text-gray-600 text-sm">{auth?.user?.email}</p>
              <span className="text-gray-600 text-sm font-mono">
                ID# {auth?.user?.memberId.slice(0, 3)}{" "}
                {auth?.user?.memberId.slice(3, 6)}{" "}
                {auth?.user?.memberId.slice(6)}
              </span>
            </div>
          </div>
          <div className="w-2/3">
            <BasicSelectInput
              label={"Country of residence"}
              options={[
                "Select Country",
                "Bangladesh",
                "India",
                "Pakistan",
                "Sri Lanka",
              ]}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <BasicTextInput
              label={"Full name"}
              placeholder={"Enter your full name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <BasicSelectInput
              label={"Gender"}
              options={["Select Gender", "Male", "Female", "Other"]}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <DOBInput
              value={dob}
              onChange={setDob}
              startYear={1950}
              endYear={new Date().getFullYear()}
              error={null}
            />

            <div className="mt-2">
              <label className="text-black font-semibold text-md mb-2 block">
                Short bio
              </label>
              <textarea
                placeholder={"Tell us about yourself"}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-start mt-2">
            <button
              onClick={(e) => handleProfileUpdate(e)}
              className="rounded-full bg-black py-2 px-4 disabled:opacity-50"
              disabled={buttonStatus}
            >
              <p className="text-md font-medium text-white">Save Changes</p>
            </button>
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              type={"password"}
            />

            <BasicTextInput
              label={"New Password"}
              placeholder={"Enter your new password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={"password"}
            />

            <BasicTextInput
              label={"Confirm New Password"}
              placeholder={"Enter your new password again"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              errorText={passwordError}
              type={"password"}
            />
          </div>

          <div className="flex justify-start">
            <button
              onClick={(e) => handlePasswordChange(e)}
              className="rounded-full bg-black py-2 px-4 disabled:opacity-50"
              disabled={!currentPassword || !newPassword || passwordError}
            >
              <p className="text-md font-medium text-white">Change Password</p>
            </button>
          </div>
        </div>
      </div>

      <ProfileImgModal isOpen={imgModal} onClose={() => setImgModal(false)} />
    </div>
  );
};
