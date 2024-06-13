// controllers/subscriptionController.ts

import { db } from "@/lib/db";

export const getSubscriptions = async () => {
  try {
    const subscriptions = await db.subscription.findMany();
    return subscriptions;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
};
