"use client";
import React from "react";
import FormContainer from "./formContainer";

const ProfileImageCard = () => {
  const handleImageChange = (e: any) => {
    console.log(e.target.files[0]);
  };

  return (
    <FormContainer
      title="Change Profile Image"
      subtitle="Upload a new profile image"
    >
      <input
        type="file"
        onChange={handleImageChange}
        className="mt-2 block w-full text-sm text-gray-500"
      />
    </FormContainer>
  );
};

export default ProfileImageCard;
