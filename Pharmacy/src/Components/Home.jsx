
import React, { useState } from "react";

const Home = ({ setPage, setRole }) => {
  const [role, setLocalRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // ADMIN LOGIN
    if (role === "Admin") {
      if (email === "admin@gmail.com" && password === "admin123") {
        sessionStorage.setItem("role", "Admin");
        sessionStorage.setItem("page", "admin_dashboard");

        setRole("Admin");
        setPage("admin_dashboard");
        return;
      } else {
        setError("Invalid Admin credentials");
        return;
      }
    }

    // CASHIER LOGIN
    if (role === "Cashier") {
      if (email === "cashier@gmail.com" && password === "cashier123") {
        sessionStorage.setItem("role", "Cashier");
        sessionStorage.setItem("page", "cashier_dashboard");

        setRole("Cashier");
        setPage("cashier_dashboard");
        return;
      } else {
        setError("Invalid Cashier credentials");
        return;
      }
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11H5m7-7v14"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            PharmaCare Pro
          </h2>
          <p className="text-gray-500 text-sm -mt-1">
            Enterprise Billing System
          </p>
        </div>

        {/* Role Select */}
        <p className="text-gray-700 font-medium mb-2">Login As</p>

        <div className="flex gap-3 mb-6">
          {["Admin", "Cashier"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLocalRole(item)}
              className={`flex-1 border rounded-lg py-2 font-medium transition ${
                role === item
                  ? "border-green-500 text-green-600 bg-green-50"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg py-2 px-3 mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg py-2 px-3 mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Admin → admin@gmail.com / admin123 <br />
          Cashier → cashier@gmail.com / cashier123
        </p>
      </div>
    </div>
  );
};

export default Home;
