import React, { useState } from "react";
import { login } from "../utils/api";
import "./loginPage.css"; // Import the external CSS file

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(username, otp);
      if (response.token) {
        onLogin(response.token);
      }
    } catch (error) {
      alert("Login Failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
