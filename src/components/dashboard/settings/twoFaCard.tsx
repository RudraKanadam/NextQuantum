"use client";
import React, { useState } from "react";
import FormContainer from "./formContainer";

const TwoFACard = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  return (
    <FormContainer
      title="Two-Factor Authentication"
      subtitle="Manage your 2FA settings"
    >
      <p className="mb-4">
        Enhance the security of your account by enabling Two-Factor
        Authentication (2FA).
      </p>
      <button
        className={`px-4 py-2 rounded-md ${
          is2FAEnabled ? "bg-red-500" : "bg-green-500"
        } text-white`}
        onClick={handleToggle2FA}
      >
        {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
      </button>
      <div className="mt-4 text-neutral-600 dark:text-neutral-300">
        <p>2FA Status: {is2FAEnabled ? "Enabled" : "Disabled"}</p>
      </div>
    </FormContainer>
  );
};

export default TwoFACard;
