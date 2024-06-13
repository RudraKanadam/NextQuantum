import React from "react";
import { Notifications } from "@/components/dashboard/home/notifications";
import NextJsCard from "./_components/NextJsCard";
import AuthJsCard from "./_components/AuthJsCard";
import ShadCnCard from "./_components/ShadCnCard";
import AcernityCard from "./_components/AcernityCard";
import BoilerplateAccordion from "./_components/BoilerplateAccordion";
import { MeteorsCard } from "./_components/Meteors";
import { checkFeatureFlag } from "@/utils/feature-flag"; // Import the helper function

const DashboardPage = async () => {
  const { session, featureCardsEnabled } = await checkFeatureFlag();

  return (
    <div className="flex flex-col gap-4 relative p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Dashboard
      </h1>

      <main className="flex flex-col gap-6">
        <section className="text-3xl font-bold mb-6">
          Welcome, {session?.user?.name}!
        </section>

        {featureCardsEnabled && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Feature Cards */}
            <NextJsCard />
            <AuthJsCard />
            <ShadCnCard />
            <AcernityCard />
          </section>
        )}

        <section className="flex justify-center items-center flex-grow mt-6">
          {/* Accordion for Boilerplate FAQ */}
          <div className="w-full lg:w-1/2">
            <BoilerplateAccordion />
          </div>
        </section>

        <section className="flex justify-center items-center flex-grow mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full lg:w-1/3 justify-center items-center">
            <MeteorsCard />
            <MeteorsCard />
            <MeteorsCard />
            <MeteorsCard />
          </div>
        </section>

        <section className="flex justify-end items-center flex-grow mt-16">
          <div className="flex justify-end items-center w-full lg:w-2/3">
            <Notifications />
          </div>
        </section>

        {/* Quick Links */}
        <section className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <div className="flex gap-4">
            <a href="/faq" className="text-blue-500 hover:underline">
              FAQ
            </a>
            <a href="/resources" className="text-blue-500 hover:underline">
              Resources
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
