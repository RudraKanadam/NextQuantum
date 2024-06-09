import { auth } from "@/auth";
import React from "react";
import { Notifications } from "@/components/dashboard/home/notifications";
import NextJsCard from "./_components/NextJsCard";
import AuthJsCard from "./_components/AuthJsCard";
import ShadCnCard from "./_components/ShadCnCard";
import AcernityCard from "./_components/AcernityCard";
import BoilerplateAccordion from "./_components/BoilerplateAccordion";
import { MeteorsCard } from "./_components/Meteors";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-4 relative p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl sticky top-0 z-[10] bg-background/50 backdrop-blur-lg flex items-center border-b p-4 md:p-6 lg:p-8">
        Dashboard
      </h1>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {session?.user?.name}!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Feature Cards */}
        <NextJsCard />
        <AuthJsCard />
        <ShadCnCard />
        <AcernityCard />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6 mx-6">
        {/* Accordion for Boilerplate FAQ */}
        <div className="flex-1 lg:w-1/3">
          <BoilerplateAccordion />
        </div>

        {/* Notifications and MeteorsCard */}
        <div className="flex flex-1 flex-col lg:flex-row gap-6 mx-8">
          <div className="flex-1">
            <Notifications />
          </div>
          <div className="flex-1">
            <MeteorsCard />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex-1 bg-white dark:bg-black p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <div className="flex gap-4">
          <a href="/faq" className="text-blue-500 hover:underline">
            FAQ
          </a>
          <a href="/resources" className="text-blue-500 hover:underline">
            Resources
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
