import { db } from "@/lib/db";
import { SubscriptionType, Environment, FeatureType } from "@prisma/client";

// Feature Management Functions

export const getFeatureById = async (id: string) => {
  try {
    const feature = await db.feature.findUnique({
      where: { id },
      include: { subscription: true, user: true },
    });
    return feature;
  } catch (error) {
    console.error("Error fetching feature by id:", error);
    return null;
  }
};

export const getAllFeatures = async () => {
  try {
    const features = await db.feature.findMany({
      include: { subscription: true, user: true },
    });
    return features;
  } catch (error) {
    console.error("Error fetching all features:", error);
    return [];
  }
};

export const createFeature = async (
  name: string,
  description: string,
  environment: Environment,
  status: boolean,
  featureType: FeatureType,
  subscriptionType?: SubscriptionType,
  subscriptionId?: string,
  userId?: string
) => {
  try {
    // Check if the user exists if userId is provided
    if (featureType === "User" && userId) {
      const user = await db.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("User not found");
      }
    }

    // Check if the subscription exists if subscriptionId is provided
    if (featureType === "Subscription" && subscriptionId) {
      const subscription = await db.subscription.findUnique({
        where: { id: subscriptionId },
      });
      if (!subscription) {
        throw new Error("Subscription not found");
      }
    }

    // Validate that either subscriptionType or subscriptionId is provided
    if (
      featureType === "Subscription" &&
      !subscriptionType &&
      !subscriptionId
    ) {
      throw new Error(
        "Either subscriptionType or subscriptionId must be provided for Subscription features"
      );
    }

    const newFeature = await db.feature.create({
      data: {
        name,
        description,
        environment,
        status,
        featureType,
        subscriptionType:
          featureType === "Subscription" ? subscriptionType : null,
        subscriptionId: featureType === "Subscription" ? subscriptionId : null,
        userId: featureType === "User" ? userId : null,
      },
      include: { subscription: true, user: true },
    });
    return newFeature;
  } catch (error) {
    console.error("Error creating feature:", error.message);
    return null;
  }
};

export const updateFeature = async (
  id: string,
  name?: string,
  description?: string,
  environment?: Environment,
  status?: boolean,
  featureType?: FeatureType,
  subscriptionType?: SubscriptionType,
  subscriptionId?: string,
  userId?: string
) => {
  try {
    const updatedFeature = await db.feature.update({
      where: { id },
      data: {
        name,
        description,
        environment,
        status,
        featureType,
        subscriptionType:
          featureType === "Subscription" ? subscriptionType : null,
        subscriptionId: featureType === "Subscription" ? subscriptionId : null,
        userId: featureType === "User" ? userId : null,
      },
      include: { subscription: true, user: true },
    });
    return updatedFeature;
  } catch (error) {
    console.error("Error updating feature:", error);
    return null;
  }
};

export const deleteFeature = async (id: string) => {
  try {
    await db.feature.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting feature:", error);
    return false;
  }
};
