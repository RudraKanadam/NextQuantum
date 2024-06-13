"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import FeatureTypeSelect from "./featureTypeSelect";
import { Input } from "./input";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const FeatureLogicModal = ({ feature, onClose }: any) => {
  const router = useRouter(); // Initialize the router
  const [selection, setSelection] = useState("Global");
  const [isUATEnabled, setIsUATEnabled] = useState(false);
  const [isDEVEnabled, setIsDEVEnabled] = useState(false);
  const [isPRODEnabled, setIsPRODEnabled] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [subscriptionType, setSubscriptionType] = useState<string | null>(null);

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
              featureType: selection,
              subscriptionType:
                selection === "Subscription" ? subscriptionType : null,
              subscriptionId:
                selection === "Subscription" ? subscriptionId : null,
              userId: selection === "User" ? userId : null,
            }),
          });
        }
      }

      onClose();
      location.reload(); // Refresh the page after feature creation
    } catch (error) {
      console.error("Error creating feature:", error);
    }
  };

  const handleSelectionChange = (
    selection: string,
    userId: string | null,
    subscriptionId: string | null,
    subscriptionType: string | null
  ) => {
    setSelection(selection);
    setUserId(userId);
    setSubscriptionId(subscriptionId);
    setSubscriptionType(subscriptionType);
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
          <TabsContent value="UAT">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>UAT Logic</CardTitle>
                    <CardDescription>
                      Configure the UAT logic for the feature {feature.name}.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={isUATEnabled}
                    onCheckedChange={setIsUATEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Feature Type</Label>
                  <FeatureTypeSelect
                    isEnabled={isUATEnabled}
                    onChange={handleSelectionChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Feature Description</Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter feature description"
                    disabled={!isUATEnabled}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="DEV">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>DEV Logic</CardTitle>
                    <CardDescription>
                      Configure the DEV logic for the feature {feature.name}.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={isDEVEnabled}
                    onCheckedChange={setIsDEVEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Feature Type</Label>
                  <FeatureTypeSelect
                    isEnabled={isDEVEnabled}
                    onChange={handleSelectionChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Feature Description</Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter feature description"
                    disabled={!isDEVEnabled}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="PROD">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>PROD Logic</CardTitle>
                    <CardDescription>
                      Configure the PROD logic for the feature {feature.name}.
                    </CardDescription>
                  </div>
                  <Switch
                    checked={isPRODEnabled}
                    onCheckedChange={setIsPRODEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Feature Type</Label>
                  <FeatureTypeSelect
                    isEnabled={isPRODEnabled}
                    onChange={handleSelectionChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Feature Description</Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter feature description"
                    disabled={!isPRODEnabled}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeatureLogicModal;
