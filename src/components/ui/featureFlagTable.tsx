"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Import Switch
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import FeatureLogicModal from "./FeatureLogicModal";
import FeatureEditModal from "./featureEditModal";

type Environment = "UAT" | "Dev" | "Prod";

interface Condition {
  id: string;
  environment: Environment;
  featureType: string;
  status: boolean;
}

interface Feature {
  id: string;
  name: string;
  description?: string;
  status: boolean; // Global status
  conditions: Condition[];
}

interface FeatureFlagTableProps {
  features: Feature[];
}

const FeatureFlagTable: React.FC<FeatureFlagTableProps> = ({ features }) => {
  const [featureList, setFeatureList] = useState(features);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    setFeatureList(features);
  }, [features]);

  const handleToggle = async () => {
    if (selectedFeature) {
      const updatedFeature = await fetch("/api/features/updateStatuses", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featureId: selectedFeature.id,
          featureStatus: !selectedFeature.status,
          conditionStatuses: selectedFeature.conditions.map((condition) => ({
            conditionId: condition.id,
            status: !selectedFeature.status,
          })),
        }),
      }).then((res) => res.json());

      if (updatedFeature) {
        setFeatureList(
          featureList.map((feature) =>
            feature.id === selectedFeature.id
              ? {
                  ...feature,
                  status: updatedFeature.status,
                  conditions: updatedFeature.conditions,
                }
              : feature
          )
        );
      }
    }
    setIsAlertOpen(false);
  };

  const handleDelete = async () => {
    if (selectedFeature) {
      const deleted = await fetch("/api/features", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedFeature.id }),
      }).then((res) => res.json());

      if (deleted) {
        setFeatureList(
          featureList.filter((feature) => feature.id !== selectedFeature.id)
        );
      }
    }
    setIsDeleteAlertOpen(false);
  };

  const handleToggleClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsAlertOpen(true);
  };

  const handleLogicClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleEditClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsDeleteAlertOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white dark:bg-black shadow-md rounded-lg text-gray-900 dark:text-white border rounder-3xl">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Feature Name</th>
            <th className="py-3 px-6 text-left">Dev</th>
            <th className="py-3 px-6 text-left">UAT</th>
            <th className="py-3 px-6 text-left">Production</th>
            <th className="py-3 px-6 text-left">Settings</th>
          </tr>
        </thead>
        <tbody>
          {featureList.map((feature) => (
            <tr
              key={feature.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <td className="py-3 px-6">{feature.name}</td>
              <td className="py-3 px-6">
                <div className="flex items-center space-x-2">
                  <p
                    className={`text-sm ${
                      feature.status &&
                      feature.conditions.some(
                        (condition) =>
                          condition.environment === "Dev" && condition.status
                      )
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {feature.status &&
                    feature.conditions.some(
                      (condition) =>
                        condition.environment === "Dev" && condition.status
                    )
                      ? "On"
                      : "Off"}
                  </p>
                  <Switch
                    checked={
                      feature.status &&
                      feature.conditions.some(
                        (condition) =>
                          condition.environment === "Dev" && condition.status
                      )
                    }
                    onCheckedChange={() => handleToggleClick(feature)}
                  />
                </div>
              </td>
              <td className="py-3 px-6">
                <div className="flex items-center space-x-2">
                  <p
                    className={`text-sm ${
                      feature.status &&
                      feature.conditions.some(
                        (condition) =>
                          condition.environment === "UAT" && condition.status
                      )
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {feature.status &&
                    feature.conditions.some(
                      (condition) =>
                        condition.environment === "UAT" && condition.status
                    )
                      ? "On"
                      : "Off"}
                  </p>
                  <Switch
                    checked={
                      feature.status &&
                      feature.conditions.some(
                        (condition) =>
                          condition.environment === "UAT" && condition.status
                      )
                    }
                    onCheckedChange={() => handleToggleClick(feature)}
                  />
                </div>
              </td>
              <td className="py-3 px-6">
                <div className="flex items-center space-x-2">
                  <p
                    className={`text-sm ${
                      feature.status &&
                      feature.conditions.some(
                        (condition) =>
                          condition.environment === "Prod" && condition.status
                      )
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {feature.status &&
                    feature.conditions.some(
                      (condition) =>
                        condition.environment === "Prod" && condition.status
                    )
                      ? "On"
                      : "Off"}
                  </p>
                  <Switch
                    checked={
                      feature.status &&
                      feature.conditions.some(
                        (condition) =>
                          condition.environment === "Prod" && condition.status
                      )
                    }
                    onCheckedChange={() => handleToggleClick(feature)}
                  />
                </div>
              </td>
              <td className="py-3 px-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      ...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleLogicClick(feature)}>
                      Logic
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditClick(feature)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(feature)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedFeature && (
        <FeatureLogicModal feature={selectedFeature} onClose={closeModal} />
      )}

      {isEditModalOpen && selectedFeature && (
        <FeatureEditModal featureId={selectedFeature.id} onClose={closeModal} />
      )}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Toggle</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to ${
                selectedFeature?.status ? "turn off" : "turn on"
              } the feature ${selectedFeature?.name} for this environment?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleToggle}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to delete the feature ${selectedFeature?.name}? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FeatureFlagTable;
