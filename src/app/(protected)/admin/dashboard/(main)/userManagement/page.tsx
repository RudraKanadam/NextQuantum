"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Adjust the import path as necessary

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

const usersData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password1",
    role: "admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password2",
    role: "user",
  },
  // Add more users as needed
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(usersData);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(null);
  };

  return (
    <div className="flex flex-col gap-4 relative p-4 md:p-6 lg:p-8">
      <h1 className="text-4xl sticky top-0 z-[10] bg-background/50 backdrop-blur-lg flex items-center border-b p-4 md:p-6 lg:p-8">
        User Management
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-3/4 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left rounded-tl-lg">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
                Role
              </th>
              <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left rounded-tr-lg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  {user.id}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  {user.role}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                  <Dialog>
                    <DialogTrigger>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                          Edit the user details below:
                        </DialogDescription>
                      </DialogHeader>
                      {selectedUser && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (selectedUser) handleSaveUser(selectedUser);
                          }}
                        >
                          <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">
                              Name
                            </label>
                            <input
                              type="text"
                              value={selectedUser.name}
                              onChange={(e) =>
                                setSelectedUser({
                                  ...selectedUser,
                                  name: e.target.value,
                                })
                              }
                              className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">
                              Email
                            </label>
                            <input
                              type="email"
                              value={selectedUser.email}
                              onChange={(e) =>
                                setSelectedUser({
                                  ...selectedUser,
                                  email: e.target.value,
                                })
                              }
                              className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">
                              Password
                            </label>
                            <input
                              type="password"
                              value={selectedUser.password}
                              onChange={(e) =>
                                setSelectedUser({
                                  ...selectedUser,
                                  password: e.target.value,
                                })
                              }
                              className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                            />
                          </div>
                          <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300">
                              Role
                            </label>
                            <select
                              value={selectedUser.role}
                              onChange={(e) =>
                                setSelectedUser({
                                  ...selectedUser,
                                  role: e.target.value,
                                })
                              }
                              className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
                            >
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                          </div>
                          <DialogFooter>
                            <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Save
                            </button>
                          </DialogFooter>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
