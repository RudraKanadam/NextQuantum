import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany();
    console.log(users);
    return users;
    console.log(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
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
  role: UserRole
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    return updatedUser;
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
