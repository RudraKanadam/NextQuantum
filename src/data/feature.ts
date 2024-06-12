import { db } from "@/lib/db";
import { Environment, FeatureType, SubscriptionType } from "@prisma/client";

// Feature Management Functions

// Create a new feature
export const createFeature = async (
  name: string,
  description: string,
  status: boolean,
  conditions: {
    environment: Environment;
    featureType: FeatureType;
    conditionStatus: boolean;
    userId?: string;
    subscriptionId?: string;
    subscriptionType?: SubscriptionType;
  }[]
) => {
  try {
    // Check for conditions for non-global features
    if (!conditions || conditions.length === 0) {
      throw new Error("Conditions are required for non-global features.");
    }

    // Validate conditions
    for (const condition of conditions) {
      if (condition.featureType === FeatureType.Subscription) {
        if (!condition.subscriptionType && !condition.subscriptionId) {
          throw new Error(
            "Either subscriptionType or subscriptionId is required for Subscription feature type."
          );
        }
      }

      if (condition.userId) {
        const user = await db.user.findUnique({
          where: { id: condition.userId },
        });
        if (!user) {
          throw new Error(`User with id ${condition.userId} not found`);
        }
      }

      if (condition.subscriptionId) {
        const subscription = await db.subscription.findUnique({
          where: { id: condition.subscriptionId },
        });
        if (!subscription) {
          throw new Error(
            `Subscription with id ${condition.subscriptionId} not found`
          );
        }
      }
    }

    const newFeature = await db.feature.create({
      data: {
        name,
        description,
        status: false, // Initial global status set to false
        conditions: {
          create: conditions.map((condition) => ({
            environment: condition.environment,
            featureType: condition.featureType,
            status: condition.conditionStatus,
            userCondition: condition.userId
              ? { create: { userId: condition.userId } }
              : undefined,
            subscriptionCondition: condition.subscriptionId
              ? { create: { subscriptionId: condition.subscriptionId } }
              : condition.subscriptionType
              ? { create: { subscriptionType: condition.subscriptionType } }
              : undefined,
          })),
        },
      },
      include: { conditions: true },
    });

    return newFeature;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating feature:", error.message);
    } else {
      console.error("Unknown error creating feature");
    }
    return null;
  }
};

// Get feature by ID
export const getFeatureById = async (id: string) => {
  try {
    const feature = await db.feature.findUnique({
      where: { id },
      include: { conditions: true },
    });
    return feature;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching feature by id:", error.message);
    } else {
      console.error("Unknown error fetching feature by id");
    }
    return null;
  }
};

// Get all features
export const getAllFeatures = async () => {
  try {
    const features = await db.feature.findMany({
      include: { conditions: true },
    });
    return features;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching all features:", error.message);
    } else {
      console.error("Unknown error fetching all features");
    }
    return [];
  }
};

// Update a feature
export const updateFeature = async (
  id: string,
  name?: string,
  description?: string,
  status?: boolean,
  conditions?: {
    environment: Environment;
    featureType: FeatureType;
    conditionStatus: boolean;
    userId?: string;
    subscriptionId?: string;
    subscriptionType?: SubscriptionType;
  }[]
) => {
  try {
    if (conditions) {
      // Validate provided userId and subscriptionId
      for (const condition of conditions) {
        if (condition.userId) {
          const user = await db.user.findUnique({
            where: { id: condition.userId },
          });
          if (!user) {
            throw new Error(`User with id ${condition.userId} not found`);
          }
        }
        if (condition.subscriptionId) {
          const subscription = await db.subscription.findUnique({
            where: { id: condition.subscriptionId },
          });
          if (!subscription) {
            throw new Error(
              `Subscription with id ${condition.subscriptionId} not found`
            );
          }
        }
      }
    }

    const updatedFeature = await db.feature.update({
      where: { id },
      data: {
        name,
        description,
        status,
        conditions: conditions
          ? {
              deleteMany: {},
              create: conditions.map((condition) => ({
                environment: condition.environment,
                featureType: condition.featureType,
                status: condition.conditionStatus,
                userCondition: condition.userId
                  ? { create: { userId: condition.userId } }
                  : undefined,
                subscriptionCondition: condition.subscriptionId
                  ? { create: { subscriptionId: condition.subscriptionId } }
                  : condition.subscriptionType
                  ? { create: { subscriptionType: condition.subscriptionType } }
                  : undefined,
              })),
            }
          : undefined,
      },
      include: { conditions: true },
    });
    return updatedFeature;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating feature:", error.message);
    } else {
      console.error("Unknown error updating feature");
    }
    return null;
  }
};

// Update feature status and condition statuses
export const updateFeatureStatus = async (id: string, status: boolean) => {
  try {
    const updatedFeature = await db.feature.update({
      where: { id },
      data: { status },
      include: { conditions: true },
    });

    if (status) {
      // If the feature is enabled globally, enable all conditions
      await db.condition.updateMany({
        where: { featureId: id },
        data: { status: true },
      });

      // Refresh the feature to get updated conditions
      const finalUpdatedFeature = await db.feature.findUnique({
        where: { id },
        include: { conditions: true },
      });
      return finalUpdatedFeature;
    } else {
      return updatedFeature;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating feature status:", error.message);
    } else {
      console.error("Unknown error updating feature status");
    }
    return null;
  }
};

// Update feature and condition statuses
export const updateFeatureAndConditionStatuses = async (
  featureId: string,
  featureStatus: boolean,
  conditionStatuses: { conditionId: string; status: boolean }[]
) => {
  try {
    // Update the feature status
    const updatedFeature = await db.feature.update({
      where: { id: featureId },
      data: { status: featureStatus },
      include: { conditions: true },
    });

    // Update each condition status
    for (const { conditionId, status } of conditionStatuses) {
      await db.condition.update({
        where: { id: conditionId },
        data: { status },
      });
    }

    // Re-fetch the feature to get the updated conditions
    const finalUpdatedFeature = await db.feature.findUnique({
      where: { id: featureId },
      include: { conditions: true },
    });

    // If feature is enabled globally, enable all conditions
    if (finalUpdatedFeature && featureStatus) {
      await db.condition.updateMany({
        where: { featureId },
        data: { status: true },
      });

      finalUpdatedFeature.conditions = finalUpdatedFeature.conditions.map(
        (condition) => ({ ...condition, status: true })
      );
    }

    return finalUpdatedFeature;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error updating feature and condition statuses:",
        error.message
      );
    } else {
      console.error("Unknown error updating feature and condition statuses");
    }
    return null;
  }
};

// Delete a feature
export const deleteFeature = async (id: string) => {
  try {
    await db.feature.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting feature:", error.message);
    } else {
      console.error("Unknown error deleting feature");
    }
    return false;
  }
};
