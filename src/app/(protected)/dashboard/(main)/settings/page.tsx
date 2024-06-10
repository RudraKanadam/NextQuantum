// pages/settings.tsx
import React from "react";
import { useSession } from "next-auth/react";
import ProfileCard from "@/components/dashboard/settings/profileCard";
import PasswordCard from "@/components/dashboard/settings/passwordCard";
import TwoFACard from "@/components/dashboard/settings/twoFaCard";
import ProfileImageCard from "@/components/dashboard/settings/profileImageCard";
import FormContainer from "@/components/dashboard/settings/formContainer";
import { auth } from "@/auth";

const Settings = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Settings
      </h1>
      <div className="flex flex-col gap-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 space-y-6">
            <ProfileCard />
            <PasswordCard />
          </div>
          <div className="space-y-6">
            <TwoFACard />
            <ProfileImageCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
