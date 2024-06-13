import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { LampEffect } from "@/components/lampEffect";
import GlobalNavBar from "@/components/global/navbar";

export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col">
      <GlobalNavBar />
      <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
          Boilerplate - NextQuantum
        </h1>
      </div>
      <LampEffect />
    </main>
  );
}
