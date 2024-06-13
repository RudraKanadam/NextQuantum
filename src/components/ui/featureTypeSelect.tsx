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

interface User {
  id: string;
  name: string;
}

interface Subscription {
  id: string;
  type: SubscriptionType;
}

interface FeatureTypeSelectProps {
  isEnabled: boolean;
  onChange: (
    selection: string,
    userId: string | null,
    subscriptionId: string | null,
    subscriptionType: SubscriptionType | null
  ) => void;
}

const FeatureTypeSelect: React.FC<FeatureTypeSelectProps> = ({
  isEnabled,
  onChange,
}) => {
  const [selection, setSelection] = useState("Global");
  const [subscriptionType, setSubscriptionType] =
    useState<SubscriptionType | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    onChange(selection, userId, subscriptionId, subscriptionType);
  }, [selection, userId, subscriptionId, subscriptionType, onChange]);

  return (
    <div className="space-y-2">
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
            onValueChange={(value: SubscriptionType) =>
              setSubscriptionType(value)
            }
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
          <Select
            onValueChange={(value: string) => setUserId(value)}
            defaultValue={userId || ""}
            disabled={!isEnabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select user ID" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default FeatureTypeSelect;
