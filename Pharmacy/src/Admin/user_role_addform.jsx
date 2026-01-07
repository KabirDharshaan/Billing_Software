

import React, { useState } from "react";

const UserRoleAddForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setLogo(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (logo) formData.append("logo", logo);

      const res = await fetch("http://localhost:5000/api/users/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add user");
        return;
      }

      alert("User added successfully");
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Add New User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@pharmacy.com"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
            required
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="cashier">Cashier</option>
          </select>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full text-sm file:mr-3 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-emerald-50 file:text-emerald-700
                       hover:file:bg-emerald-100"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-20 w-20 object-cover rounded-lg border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-medium transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
        >
          {loading ? "Saving..." : "Save User"}
        </button>
      </form>
    </div>
  );
};

export default UserRoleAddForm;

















