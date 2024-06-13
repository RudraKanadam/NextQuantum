import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { FlipWords } from "@/components/ui/flip-words";
import { LampEffect } from "@/components/lampEffect";
import GlobalNavBar from "@/components/global/navbar";

export default function Home() {
  const words = ["Effect", "Modern", "Faster", "Better"];
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
        <div className="text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Develop
          <FlipWords words={words} /> <br />
          <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
            websites with NextQuantum
          </div>
        </div>
      </div>
      <LampEffect />
    </main>
  );
}
