
import React, { useState } from "react";
import axios from "axios";

const Home = ({ setPage, setRole }) => {
  const [selectedRole, setSelectedRole] = useState("admin"); // UI highlight
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send selected role and credentials to backend
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
          role: selectedRole,
        }
      );

      if (res.data?.success) {
        const user = res.data.user;

        // Normalize role
        const role = user.role.toLowerCase();

        // Save session
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("role", role);

        // Redirect like old logic
        if (role === "admin") {
          sessionStorage.setItem("page", "admin_dashboard");
          setRole("Admin"); // match old frontend logic
          setPage("admin_dashboard");
        } else if (role === "cashier") {
          sessionStorage.setItem("page", "cashier_dashboard");
          setRole("Cashier"); // match old frontend logic
          setPage("cashier_dashboard");
        } else {
          setError("Unauthorized role");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email, password, or role"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-600 p-4 rounded-xl shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m7-7v14" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            PharmaCare Pro
          </h2>
          <p className="text-gray-500 text-sm -mt-1">
            Enterprise Billing System
          </p>
        </div>

        {/* Role Selection */}
        <p className="text-gray-700 font-medium mb-2">Login As</p>
        <div className="flex gap-3 mb-6">
          {[
            { label: "Admin", value: "admin" },
            { label: "Cashier", value: "cashier" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setSelectedRole(item.value)}
              className={`flex-1 py-2 rounded-lg border font-medium ${
                selectedRole === item.value
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
