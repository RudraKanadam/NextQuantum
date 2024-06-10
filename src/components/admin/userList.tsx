"use client";

import React from "react";

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

type UserListProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
};

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
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
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left">
              Subscription
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
                {user.subscription.type}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
