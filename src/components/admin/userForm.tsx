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
  DialogClose,
} from "@/components/ui/dialog";
import { RxCross2 } from "react-icons/rx";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

type UserFormProps = {
  user: User;
  onSave: (user: User) => void;
  onClose: () => void;
};

const UserForm: React.FC<UserFormProps> = ({
  user: initialUser,
  onSave,
  onClose,
}) => {
  const [user, setUser] = useState<User>(initialUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user.id ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {user.id
              ? "Edit the user details below:"
              : "Fill in the details for the new user below:"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
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
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <RxCross2 className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
