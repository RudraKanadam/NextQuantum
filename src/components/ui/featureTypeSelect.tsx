import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SeparatorWithOr from "@/components/ui/separatorWithOr";

enum SubscriptionType {
  Basic = "Basic",
  Premium = "Premium",
  Teams = "Teams",
  Enterprise = "Enterprise",
}

interface Subscription {
  id: string;
  type: SubscriptionType;
}

interface FeatureTypeSelectProps {
  isEnabled: boolean;
}

const FeatureTypeSelect: React.FC<FeatureTypeSelectProps> = ({ isEnabled }) => {
  const [selection, setSelection] = useState("Global");
  const [subscriptionType, setSubscriptionType] =
    useState<SubscriptionType | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    setSubscriptionType(null);
    setSubscriptionId(null);
    setUserId(null);
  }, [selection]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await fetch("/api/subscriptions");
      const data = await response.json();
      setSubscriptions(data);
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="space-y-2">
      <Label>Feature Type</Label>
      <Select
        onValueChange={setSelection}
        defaultValue={selection}
        disabled={!isEnabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select feature type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Global">Global</SelectItem>
          <SelectItem value="Subscription">Subscription</SelectItem>
          <SelectItem value="User">User</SelectItem>
        </SelectContent>
      </Select>
      {selection === "Subscription" && (
        <div className="space-y-2">
          <Label>Subscription Type</Label>
          <Select
            onValueChange={(value: SubscriptionType) => {
              setSubscriptionType(value);
              setSubscriptionId(""); // Clear subscription ID when a type is selected
            }}
            defaultValue={subscriptionType || ""}
            disabled={!isEnabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subscription type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SubscriptionType.Basic}>Basic</SelectItem>
              <SelectItem value={SubscriptionType.Premium}>Premium</SelectItem>
              <SelectItem value={SubscriptionType.Teams}>Teams</SelectItem>
              <SelectItem value={SubscriptionType.Enterprise}>
                Enterprise
              </SelectItem>
            </SelectContent>
          </Select>
          <SeparatorWithOr />
          <Label>Subscription ID</Label>
          <Select
            onValueChange={(value: string) => {
              setSubscriptionId(value);
              setSubscriptionType(null); // Clear subscription type when an ID is selected
            }}
            defaultValue={subscriptionId || ""}
            disabled={!isEnabled || subscriptionType !== null} // Disable if a subscription type is selected
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subscription ID" />
            </SelectTrigger>
            <SelectContent>
              {subscriptions.map((subscription) => (
                <SelectItem key={subscription.id} value={subscription.id}>
                  {subscription.id} ({subscription.type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {selection === "User" && (
        <div className="space-y-2">
          <Label>User ID</Label>
          <Input
            value={userId || ""}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            disabled={!isEnabled}
          />
        </div>
      )}
    </div>
  );
};

export default FeatureTypeSelect;
