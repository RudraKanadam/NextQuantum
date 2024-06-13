import { auth } from "@/auth";
import { headers } from "next/headers";
import { Feature } from "@/types/featureFlags"; // Import the types

export const checkFeatureFlag = async () => {
  const session = await auth();
  const environment =
    (process.env.ENVIRONMENT as "UAT" | "Dev" | "Prod") || "Dev";
  const userId = session?.user?.id;
  const subscriptionId = session?.user?.subscriptionId || undefined;
  const subscriptionType = session?.user?.subscriptionType || undefined;

  // Construct the full URL for the fetch request
  const baseUrl = headers().get("origin") || process.env.NEXT_PUBLIC_BASE_URL;
  const featuresUrl = `${baseUrl}/api/features`;

  // Fetch feature flags from the backend
  const response = await fetch(featuresUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch features: ${response.statusText}`);
  }
  const features: Feature[] = await response.json();

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
        if (condition.status) {
          // Check for specific conditions if the status is true
          if (condition.featureType === "User" && condition.userCondition) {
            return condition.userCondition.userId === userId; // User-specific condition check
          }
          if (
            condition.featureType === "Subscription" &&
            condition.subscriptionCondition
          ) {
            if (subscriptionId) {
              return (
                condition.subscriptionCondition.subscriptionId ===
                subscriptionId
              ); // Subscription ID condition check
            }
            if (subscriptionType) {
              return (
                condition.subscriptionCondition.subscriptionType ===
                subscriptionType
              ); // Subscription Type condition check
            }
          }
          return true; // Default to true if no specific conditions are present
        }
      }
    }
    return false; // Default to false if no conditions match
  };

  const featureCardsEnabled = isFeatureEnabled(
    "dashboard.features.card",
    environment,
    userId,
    subscriptionId,
    subscriptionType
  );

  return { session, featureCardsEnabled };
};
