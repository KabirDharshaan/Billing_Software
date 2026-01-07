

import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import UserRoleAddForm from "./user_role_addform";

export default function SettingsUserRole() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [users, setUsers] = useState([]);      // MUST be array
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      // IMPORTANT: backend returns { success, users }
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= ADD FORM VIEW ================= */
  if (showAddForm) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => {
            setShowAddForm(false);
            fetchUsers(); // refresh list after add
          }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-teal-600"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to User List
        </button>

        <UserRoleAddForm />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* ================= USER MANAGEMENT ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              User Management
            </h2>
            <p className="text-sm text-gray-500">
              Manage user accounts and permissions
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <PlusIcon className="h-5 w-5" />
            Add User
          </button>
        </div>

        {/* ================= USERS LIST ================= */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500">No users found</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  {user.logo ? (
                    <img
                      src={`http://localhost:5000/${user.logo}`}
                      alt="logo"
                      className="h-12 w-12 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-teal-500 text-white">
                      <UserCircleIcon className="h-7 w-7" />
                    </div>
                  )}

                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {user.role}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    active
                  </span>

                  <button className="text-gray-500 hover:text-teal-600 transition">
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>

                  <button className="text-gray-500 hover:text-red-500 transition">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= ROLE PERMISSIONS ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Role Permissions
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-medium text-gray-800">Admin</h3>
            <p className="text-sm text-gray-500">
              Full access to all features and settings
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-medium text-gray-800">Cashier</h3>
            <p className="text-sm text-gray-500">
              Handle billing and checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

