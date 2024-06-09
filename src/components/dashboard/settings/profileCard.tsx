import React from "react";
import { useSession } from "next-auth/react";
import FormContainer from "./formContainer";
import { auth } from "@/auth";

const ProfileCard = async () => {
  const session = await auth();

  return (
    <FormContainer
      title="Profile Information"
      subtitle="Update your profile details"
    >
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
            defaultValue={session?.user?.name ?? ""}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
            defaultValue={session?.user?.email ?? ""}
            disabled
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Save Changes
        </button>
      </form>
    </FormContainer>
  );
};

export default ProfileCard;
