import { db } from "@/lib/db";
import { SubscriptionType, Environment } from "@prisma/client";
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
  environment: Environment,
  status: boolean,
  subscriptionType?: SubscriptionType,
  subscriptionId?: string,
  userId?: string
) => {
  try {
    const newFeature = await db.feature.create({
      data: {
        name,
        environment,
        status,
        subscriptionType,
        subscriptionId,
        userId,
      },
      include: { subscription: true, user: true },
    });
    return newFeature;
  } catch (error) {
    console.error("Error creating feature:", error);
    return null;
  }
};

export const updateFeature = async (
  id: string,
  name?: string,
  environment?: Environment,
  status?: boolean,
  subscriptionType?: SubscriptionType,
  subscriptionId?: string,
  userId?: string
) => {
  try {
    const updatedFeature = await db.feature.update({
      where: { id },
      data: {
        name,
        environment,
        status,
        subscriptionType,
        subscriptionId,
        userId,
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
