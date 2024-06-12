"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnvironmentTab from "./featureEnvironmentTab";
import { Button } from "@/components/ui/button";

enum SubscriptionType {
  Basic = "Basic",
  Premium = "Premium",
  Teams = "Teams",
  Enterprise = "Enterprise",
}

const FeatureLogicModal = ({ feature, onClose }: any) => {
  const [isUATEnabled, setIsUATEnabled] = useState(false);
  const [isDEVEnabled, setIsDEVEnabled] = useState(false);
  const [isPRODEnabled, setIsPRODEnabled] = useState(false);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setDescription(feature.description || "");
  }, [feature]);

  const handleConfirm = async () => {
    const environments = [
      { name: "UAT", enabled: isUATEnabled },
      { name: "Dev", enabled: isDEVEnabled },
      { name: "Prod", enabled: isPRODEnabled },
    ];

    try {
      for (const env of environments) {
        if (env.enabled) {
          await fetch("/api/features", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: feature.name,
              description,
              environment: env.name,
              status: env.enabled,
              featureType: "Subscription", // Assuming featureType is set to "Subscription"
              subscriptionType: SubscriptionType.Premium, // Example subscription type
              subscriptionId: null,
              userId: null,
            }),
          });
        }
      }

      onClose();
    } catch (error) {
      console.error("Error creating feature:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <Tabs defaultValue="DEV">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="DEV">DEV</TabsTrigger>
            <TabsTrigger value="UAT">UAT</TabsTrigger>
            <TabsTrigger value="PROD">PROD</TabsTrigger>
          </TabsList>
          <TabsContent value="DEV">
            <EnvironmentTab
              title="DEV Logic"
              featureName={feature.name}
              isEnabled={isDEVEnabled}
              setIsEnabled={setIsDEVEnabled}
              description={description}
              setDescription={setDescription}
            />
          </TabsContent>
          <TabsContent value="UAT">
            <EnvironmentTab
              title="UAT Logic"
              featureName={feature.name}
              isEnabled={isUATEnabled}
              setIsEnabled={setIsUATEnabled}
              description={description}
              setDescription={setDescription}
            />
          </TabsContent>
          <TabsContent value="PROD">
            <EnvironmentTab
              title="PROD Logic"
              featureName={feature.name}
              isEnabled={isPRODEnabled}
              setIsEnabled={setIsPRODEnabled}
              description={description}
              setDescription={setDescription}
            />
          </TabsContent>
        </Tabs>
        <CardFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </CardFooter>
      </div>
    </div>
  );
};

export default FeatureLogicModal;
