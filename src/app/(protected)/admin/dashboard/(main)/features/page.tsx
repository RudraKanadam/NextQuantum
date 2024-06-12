"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FeatureFlagTable from "@/components/ui/featureFlagTable";
import FeatureLogicModal from "@/components/ui/FeatureLogicModal";

const FeaturePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [isLogicModalOpen, setIsLogicModalOpen] = useState(false);
  const [createdFeature, setCreatedFeature] = useState<any>(null);
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("/api/features", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Ensure environments object is initialized
        const initializedFeatures = data.map((feature: any) => ({
          ...feature,
          environments: feature.environments || {
            UAT: false,
            Dev: false,
            Prod: false,
          },
        }));
        setFeatures(initializedFeatures);
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, []);

  const handleCreateFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      name: newFeatureName,
      environments: { UAT: false, Dev: false, Prod: false },
    };
    setCreatedFeature(newFeature);
    setIsDialogOpen(false);
    setIsLogicModalOpen(true);
  };

  const closeLogicModal = () => {
    setIsLogicModalOpen(false);
    setCreatedFeature(null);
  };

  return (
    <div className="flex flex-col gap-4 relative p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl sticky top-0 z-[10] bg-background/50 backdrop-blur-lg flex items-center border-b p-4 md:p-6 lg:p-8">
        Feature Management
      </h1>
      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create Feature
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Feature</DialogTitle>
              <DialogDescription>
                Enter the name of the new feature and configure its settings.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Label htmlFor="featureName">Feature Name</Label>
              <Input
                id="featureName"
                value={newFeatureName}
                onChange={(e) => setNewFeatureName(e.target.value)}
                placeholder="Enter feature name"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFeature}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <FeatureFlagTable features={features} />
      {isLogicModalOpen && createdFeature && (
        <FeatureLogicModal feature={createdFeature} onClose={closeLogicModal} />
      )}
    </div>
  );
};

export default FeaturePage;
