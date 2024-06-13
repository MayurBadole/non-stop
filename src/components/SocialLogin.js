import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../styles/SocialLogin.css";
import { useLinkedIn } from "react-linkedin-login-oauth2";

const SocialLogin = ({ onLoginSuccess }) => {
  const handleSuccess = (response) => {
    onLoginSuccess(response);
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  const { linkedInLogin } = useLinkedIn({
    clientId: "86ronxpnwhvw7i",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="social-login">
      <GoogleOAuthProvider clientId="206544858496-kjidc8s27m43p2e4iausju21rnkujd47.apps.googleusercontent.com">
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </GoogleOAuthProvider>

      <img
        onClick={linkedInLogin}
        src="https://brand.linkedin.com/apps/settings/wcm/designs/linkedin/katy/global/clientlibs/resources/img/default-share.png"
        alt="Sign in with Linked In"
        style={{ maxWidth: "180px", cursor: "pointer" }}
      />
    </div>
  );
};

export default SocialLogin;
