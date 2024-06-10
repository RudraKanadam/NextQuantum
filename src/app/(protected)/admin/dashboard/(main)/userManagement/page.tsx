"use client";

import React, { useState, useEffect } from "react";
import UserForm from "@/components/admin/userForm";
import UserList from "@/components/admin/userList";

type Subscription = {
  type: string;
  startDate: string;
  endDate?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  subscription: Subscription;
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      console.log("Updating user:", updatedUser);

      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedUser,
          subscriptionType: updatedUser.subscription.type,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === data.id ? data : user))
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCreateUser = async (newUser: User) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newUser,
          subscriptionType: newUser.subscription.type, // Pass subscription type
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      setNewUser(null);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 relative p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl sticky top-0 z-[10] bg-background/50 backdrop-blur-lg flex items-center border-b p-4 md:p-6 lg:p-8">
        User Management
      </h1>
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <button
        onClick={() =>
          setNewUser({
            id: "",
            name: "",
            email: "",
            password: "",
            role: "user",
            subscription: {
              type: "Basic",
              startDate: new Date().toISOString(),
            },
          })
        }
        className="mt-4 w-28 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add User
      </button>
      {selectedUser && (
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {newUser && (
        <UserForm
          user={newUser}
          onSave={handleCreateUser}
          onClose={() => setNewUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
