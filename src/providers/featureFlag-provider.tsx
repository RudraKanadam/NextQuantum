"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserCondition {
  userId: string;
  conditionId: string;
}

interface SubscriptionCondition {
  subscriptionId?: string;
  subscriptionType?: string;
  conditionId: string;
}

interface Condition {
  environment: "UAT" | "Dev" | "Prod";
  featureType: "Global" | "Subscription" | "User";
  status: boolean;
  userCondition?: UserCondition;
  subscriptionCondition?: SubscriptionCondition;
}

interface Feature {
  id: string;
  name: string;
  status: boolean; // Global status
  conditions: Condition[];
}

interface FeatureFlagContextProps {
  features: Feature[];
  isFeatureEnabled: (
    featureName: string,
    environment: "UAT" | "Dev" | "Prod",
    userId?: string,
    subscriptionId?: string,
    subscriptionType?: string
  ) => boolean;
}

const FeatureFlagContext = createContext<FeatureFlagContextProps | undefined>(
  undefined
);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    // Fetch feature flags from the backend
    const fetchFeatures = async () => {
      const response = await fetch("/api/features");
      const data = await response.json();
      setFeatures(data);
    };

    fetchFeatures();
  }, []);

  const isFeatureEnabled = (
    featureName: string,
    environment: "UAT" | "Dev" | "Prod",
    userId?: string,
    subscriptionId?: string,
    subscriptionType?: string
  ): boolean => {
    const feature = features.find((f) => f.name === featureName);
    if (feature) {
      if (feature.status) return true; // Global status check
      const condition = feature.conditions.find(
        (c) => c.environment === environment
      );
      if (condition) {
        if (condition.status) return true; // Environment-specific status check
        if (condition.featureType === "User" && condition.userCondition) {
          return condition.userCondition.userId === userId; // User-specific condition check
        }
        if (
          condition.featureType === "Subscription" &&
          condition.subscriptionCondition
        ) {
          if (subscriptionId) {
            return (
              condition.subscriptionCondition.subscriptionId === subscriptionId
            ); // Subscription ID condition check
          }
          if (subscriptionType) {
            return (
              condition.subscriptionCondition.subscriptionType ===
              subscriptionType
            ); // Subscription Type condition check
          }
        }
      }
    }
    return false; // Default to false if no conditions match
  };

  return (
    <FeatureFlagContext.Provider value={{ features, isFeatureEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagProvider"
    );
  }
  return context;
};
