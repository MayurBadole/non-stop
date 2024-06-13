import React from "react";
import SocialLogin from "../components/SocialLogin";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    // handle user data and token here
    navigate("/home");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <SocialLogin onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Login;
