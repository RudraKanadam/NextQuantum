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
import FeatureTypeEditSelect from "./FeatureTypeEditSelect";
import { Input } from "./input";
import { useRouter } from "next/navigation";

const FeatureEditModal = ({ featureId, onClose }: any) => {
  const router = useRouter();
  const [selection, setSelection] = useState("Global");
  const [isUATEnabled, setIsUATEnabled] = useState(false);
  const [isDEVEnabled, setIsDEVEnabled] = useState(false);
  const [isPRODEnabled, setIsPRODEnabled] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [subscriptionType, setSubscriptionType] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const response = await fetch(`/api/features?id=${featureId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const feature = await response.json();

        setDescription(feature.description);
        setSelection(feature.conditions[0]?.featureType || "Global");

        feature.conditions.forEach((condition: any) => {
          switch (condition.environment) {
            case "UAT":
              setIsUATEnabled(condition.status);
              break;
            case "Dev":
              setIsDEVEnabled(condition.status);
              break;
            case "Prod":
              setIsPRODEnabled(condition.status);
              break;
          }
          if (condition.featureType === "User") {
            setUserId(condition.userCondition?.userId || null);
          } else if (condition.featureType === "Subscription") {
            setSubscriptionId(
              condition.subscriptionCondition?.subscriptionId || null
            );
            setSubscriptionType(
              condition.subscriptionCondition?.subscriptionType || null
            );
          }
        });
      } catch (error) {
        console.error("Error fetching feature:", error);
      }
    };

    fetchFeature();
  }, [featureId]);

  const handleConfirm = async () => {
    const environments = [
      { name: "UAT", enabled: isUATEnabled },
      { name: "Dev", enabled: isDEVEnabled },
      { name: "Prod", enabled: isPRODEnabled },
    ];

    try {
      for (const env of environments) {
        await fetch("/api/features", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: featureId,
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

      onClose();
      location.reload();
    } catch (error) {
      console.error("Error updating feature:", error);
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
                      Configure the UAT logic for the feature.
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
                  <FeatureTypeEditSelect
                    isEnabled={isUATEnabled}
                    onChange={handleSelectionChange}
                    currentType={selection}
                    userId={userId}
                    subscriptionId={subscriptionId}
                    subscriptionType={subscriptionType}
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
                      Configure the DEV logic for the feature.
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
                  <FeatureTypeEditSelect
                    isEnabled={isDEVEnabled}
                    onChange={handleSelectionChange}
                    currentType={selection}
                    userId={userId}
                    subscriptionId={subscriptionId}
                    subscriptionType={subscriptionType}
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
                      Configure the PROD logic for the feature.
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
                  <FeatureTypeEditSelect
                    isEnabled={isPRODEnabled}
                    onChange={handleSelectionChange}
                    currentType={selection}
                    userId={userId}
                    subscriptionId={subscriptionId}
                    subscriptionType={subscriptionType}
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

export default FeatureEditModal;
