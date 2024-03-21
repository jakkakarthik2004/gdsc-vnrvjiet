import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { forgotPw, resetPw, verifypw } from "../Apis/users";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await forgotPw(email);
      setOtpSent(true);
      toast.success("OTP Sent!", 
      {style:{background:'#86efac'}}
      );
      
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again later.");
      toast.error("Failed to send OTP. Please try again later.", 
      {style:{background:'#f87171'}}
      );
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifypw({ otp: otp }, { email: email });
      setVerified(response.result);
      setErrorMessage("");
      toast.success("OTP Verified!", 
      {style:{background:'#86efac'}}
      );
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
      // toast.error("Invalid OTP. Please try again.");
      toast.error("Invalid OTP. Please try again.", 
      {style:{background:'#fca5a5'}}
      );
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPw(newPassword, confirmPassword, email);
      toast.success("Password reset successful!", 
      {style:{background:'#86efac'}}
      );
      navigate("/login");
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
      toast.error("Failed to reset password. Please try again.", 
      {style:{background:'#fca5a5'}}
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!otpSent ? (
        <div className="mt-16 justify-center bg-gray-200 p-8 rounded">
          <h2 className="text-center text-2xl font-bold pb-3">
            Forgot Password?
          </h2>
          <div>
            <label>Email:</label>
            <input
              className="w-80 p-3 m-3 rounded"
              type="email"
              value={email}
              placeholder="Enter the email you registered with"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="w-24 bg-green-600 text-white font-bold rounded p-2 m-2 r hover:ring ring-green-400 ring-offset-2 transition"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </div>
      ) : (
        <>
          <div className="mt-16 justify-center flex flex-col bg-gray-200 rounded-xl p-10">
            <h2 className="text-center text-2xl font-bold pb-3">
              Verify your OTP
            </h2>
            <div>
              <label>Enter OTP:</label>
              <input
                className="rounded m-3 p-3"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-400 p-2 m-2 font-bold rounded hover:ring ring-blue-600 ring-offset-2 transition"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
          {verified && (
            <div className="text-center mt-16 justify-center flex flex-col bg-gray-200 rounded-xl p-10">
              <h1 className="text-center text-2xl font-bold pb-3">
                Set a new password :
              </h1>
              <div className="">
                <label>New Password:</label>
                <input
                  className="rounded m-3 p-3"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label>Confirm Password:</label>
                <input
                  className="rounded m-3 p-3"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-green-500 p-2 m-2 font-bold rounded hover:ring ring-green-600 ring-offset-2 transition"
                onClick={handleResetPassword}
              >
                Submit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
