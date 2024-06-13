import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserRole, SubscriptionType } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: { subscription: true },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: { subscription: true },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      include: { subscription: true },
    });
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole,
  subscriptionType: SubscriptionType // Add subscription type parameter
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        subscription: {
          create: {
            type: subscriptionType, // Use provided subscription type
          },
        },
      },
      include: {
        subscription: true,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUser = async (
  id: string,
  name: string,
  email: string,
  password: string,
  role: UserRole,
  subscriptionType: SubscriptionType // Add subscription type for update
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update user details
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      include: {
        subscription: true,
      },
    });

    // Update or create the subscription
    if (updatedUser.subscriptionId) {
      await db.subscription.update({
        where: { id: updatedUser.subscriptionId },
        data: {
          type: subscriptionType,
        },
      });
    } else {
      const newSubscription = await db.subscription.create({
        data: {
          type: subscriptionType,
          user: {
            connect: { id: updatedUser.id },
          },
        },
      });

      // Update user with new subscription ID
      await db.user.update({
        where: { id: updatedUser.id },
        data: {
          subscriptionId: newSubscription.id,
        },
      });
    }

    // Fetch and return the updated user
    const finalUser = await db.user.findUnique({
      where: { id },
      include: { subscription: true },
    });

    return finalUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await db.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
