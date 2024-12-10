import React, { useState } from "react";
import { login } from "../utils/api";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, otp);
      if (response.token) {
        alert("Login Successful!");
        onLogin(response.token);
      }
    } catch (error) {
      alert("Login Failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 border"
      />
      <input
        type="password"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="mb-4 p-2 border"
      />
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
