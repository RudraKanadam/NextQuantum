import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import FeatureTypeSelect from "./featureTypeSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EnvironmentTabProps {
  title: string;
  featureName: string;
  isEnabled: boolean;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onChange: (
    selection: string,
    userId: string | null,
    subscriptionId: string | null,
    subscriptionType: string | null
  ) => void;
}

const EnvironmentTab: React.FC<EnvironmentTabProps> = ({
  title,
  featureName,
  isEnabled,
  setIsEnabled,
  description,
  setDescription,
  onChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Configure the logic for the feature {featureName}.
            </CardDescription>
          </div>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <FeatureTypeSelect isEnabled={isEnabled} onChange={onChange} />
        <div className="space-y-2">
          <Label>Feature Description</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter feature description"
            disabled={!isEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentTab;
