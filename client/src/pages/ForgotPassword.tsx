import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { forgotPw, resetPw, verifypw } from "../Apis/users";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await forgotPw({ email: email });
      setOtpSent(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again later.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifypw({ otp: otp }, { email: email });
      setVerified(response.result);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPw(newPassword, confirmPassword, email);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!otpSent ? (
        <div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
      {verified && (
        <div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handleResetPassword}>submit</button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
