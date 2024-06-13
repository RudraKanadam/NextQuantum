// types/featureFlags.ts

export interface UserCondition {
  userId: string;
  conditionId: string;
}

export interface SubscriptionCondition {
  subscriptionId?: string;
  subscriptionType?: string;
  conditionId: string;
}

export interface Condition {
  id: string;
  featureId: string;
  environment: "UAT" | "Dev" | "Prod";
  featureType: "Global" | "Subscription" | "User";
  status: boolean;
  userCondition?: UserCondition | null;
  subscriptionCondition?: SubscriptionCondition | null;
}

export interface Feature {
  id: string;
  name: string;
  description?: string;
  status: boolean;
  conditions: Condition[];
}
