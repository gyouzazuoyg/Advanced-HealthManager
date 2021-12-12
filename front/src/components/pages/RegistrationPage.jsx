import React from "react";
import AccountSection from "../sections/AccountSection";
import LoginNavbar from "../widgets/LoginNavbar";

function RegistrationPage() {
  return (
    <>
      <LoginNavbar />
      <div className="web-page">
        <AccountSection status="register" />
      </div>
    </>
  );
}

export default RegistrationPage;
