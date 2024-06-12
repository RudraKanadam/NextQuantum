"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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

type Environment = "UAT" | "Dev" | "Prod";

interface Condition {
  id: string;
  environment: Environment;
  status: boolean;
}

interface Feature {
  id: string;
  name: string;
  description?: string;
  status: boolean;
  conditions: Condition[];
}

interface FeatureFlagTableProps {
  features: Feature[];
}

const FeatureFlagTable: React.FC<FeatureFlagTableProps> = ({ features }) => {
  const router = useRouter();
  const [featureList, setFeatureList] = useState(features);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    setFeatureList(features);
  }, [features]);

  const handleToggle = async () => {
    if (selectedFeature && selectedCondition) {
      const updatedFeature = await fetch("/api/features/updateStatus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          featureId: selectedFeature.id,
          featureStatus: selectedFeature.status,
          conditionStatuses: [
            {
              conditionId: selectedCondition.id,
              status: !selectedCondition.status,
            },
          ],
        }),
      }).then((res) => res.json());

      if (updatedFeature) {
        setFeatureList((prev) =>
          prev.map((feature) =>
            feature.id === updatedFeature.id ? updatedFeature : feature
          )
        );
      }
    }
    setIsAlertOpen(false);
  };

  const handleToggleClick = (feature: Feature, condition: Condition) => {
    setSelectedFeature(feature);
    setSelectedCondition(condition);
    setIsAlertOpen(true);
  };

  const handleLogicClick = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  const handleRowClick = (featureId: string) => {
    router.push(`/feature/${featureId}`);
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
              onClick={() => handleRowClick(feature.id)}
            >
              <td className="py-3 px-6">{feature.name}</td>
              {["Dev", "UAT", "Prod"].map((env) => {
                const condition = feature.conditions.find(
                  (cond) => cond.environment === env
                );
                return (
                  <td
                    key={env}
                    className="py-3 px-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center space-x-2">
                      <p
                        className={`text-sm ${
                          condition && condition.status
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {condition && condition.status ? "On" : "Off"}
                      </p>
                      <Switch
                        checked={condition && condition.status}
                        onCheckedChange={() =>
                          handleToggleClick(feature, condition!)
                        }
                      />
                    </div>
                  </td>
                );
              })}
              <td className="py-3 px-6" onClick={(e) => e.stopPropagation()}>
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
                    <DropdownMenuItem
                      onClick={() => console.log(`Edit feature ${feature.id}`)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        console.log(`Delete feature ${feature.id}`)
                      }
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

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Toggle</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to ${
                selectedCondition?.status ? "turn off" : "turn on"
              } the feature ${selectedFeature?.name} for ${
                selectedCondition?.environment
              } environment?`}
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
    </div>
  );
};

export default FeatureFlagTable;
