import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../styles/SocialLogin.css";

const SocialLogin = ({ onLoginSuccess }) => {
  const handleSuccess = (response) => {
    onLoginSuccess(response);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="social-login">
      <GoogleOAuthProvider clientId="206544858496-kjidc8s27m43p2e4iausju21rnkujd47.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </GoogleOAuthProvider>
    </div>
  );
};

export default SocialLogin;
