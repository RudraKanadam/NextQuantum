"use client";
import React, { useState } from "react";
import FormContainer from "./formContainer";
import PasswordInput from "../../auth/passwordInput";

const PasswordCard: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <FormContainer
      title="Change Password"
      subtitle="Update your account password"
    >
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <PasswordInput
            id="current-password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <PasswordInput
            id="new-password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Change Password
        </button>
      </form>
    </FormContainer>
  );
};

export default PasswordCard;
