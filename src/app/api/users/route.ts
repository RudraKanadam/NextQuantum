import { NextResponse } from "next/server";
import { getAllUsers, createUser, updateUser, deleteUser } from "@/data/user"; // Ensure this import path is correct

export async function GET() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, password, role, subscriptionType } = await req.json();
    const newUser = await createUser(
      name,
      email,
      password,
      role,
      subscriptionType
    );
    if (newUser) {
      return NextResponse.json(newUser, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, email, password, role, subscriptionType } =
      await req.json();
    const updatedUser = await updateUser(
      id,
      name,
      email,
      password,
      role,
      subscriptionType
    );

    if (updatedUser) {
      return NextResponse.json(updatedUser, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error updating user" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const success = await deleteUser(id);
    if (success) {
      return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error deleting user" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}
