import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, verifyUserEmail } from "../redux/actions";

/**
 * @author
 * @function Verification
 **/

export const Verification = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title =
      "User Verification - Ali Store BD | International Shopping Solution";
  }, []);

  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");

  const [otp, setOtp] = React.useState("");

  const verifyEmail = () => {
    dispatch(verifyUserEmail(email, otp));
  };

  const hasSentOTP = useRef(false);

  useEffect(() => {
    if (hasSentOTP.current) return;

    hasSentOTP.current = true;
    dispatch(sendOtp(email));
  }, [dispatch, email]);

  if (!email) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="min-h-[90vh] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-black">
          Email Verification
        </h1>
        <p className="text-sm text-center text-black">
          Please check your email for the verification code. If you haven't
          received it, please check your spam folder or request a new code.
        </p>

        <input
          type="text"
          required
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2F5651] focus:border-[#2F5651] mt-4"
          placeholder="Enter verification code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="button"
          className="w-full rounded-lg bg-[#2F5651] py-2.5 text-sm font-semibold text-white hover:bg-[#24443f] mt-4"
          onClick={verifyEmail}
        >
          Verify
        </button>
      </div>
    </div>
  );
};
