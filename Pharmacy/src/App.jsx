
import React, { useState, useEffect } from "react";

// Login
import Home from "./Components/Home";

// Admin
import AdminSidebar from "./Admin/Admin_side_nav";
import AdminDashboard from "./Admin/Admin_dashboard";
import AdminProducts from "./Admin/Admin_products";
import CreateBill from "./Admin/Admin_Billing_page";
import AdminSupplier from "./Admin/Admin_Supplier";
import AdminReport from "./Admin/Admin_reports";
import AdminCustomers from "./Admin/Admin_customers";
import AdminSettings from "./Admin/Admin_Settings";

// Cashier
import CashierSidebar from "./Cashier/Cashier_nav";
import CashierDashboard from "./Cashier/Cashier_dashboard";
import CashierBilling from "./Cashier/Cashier_Billing";

const App = () => {
  const [page, setPage] = useState(() => sessionStorage.getItem("page") || "login");
  const [role, setRole] = useState(() => sessionStorage.getItem("role") || "");

  useEffect(() => {
    sessionStorage.setItem("page", page);
  }, [page]);

  useEffect(() => {
    sessionStorage.setItem("role", role);
  }, [role]);

  const handleLogout = () => {
    sessionStorage.clear();
    setPage("login");
    setRole("");
  };

  const renderPage = () => {
    if (role === "Admin") {
      switch (page) {
        case "admin_dashboard":
          return <AdminDashboard />;
        case "admin_products":
          return <AdminProducts setPage={setPage} />;
        case "admin_billing":
          return <CreateBill />;
        case "admin_suppliers":
          return <AdminSupplier />;
        case "admin_reports":
          return <AdminReport />;
        case "admin_customers":
          return <AdminCustomers />;
        case "admin_settings":
          return <AdminSettings />;
        default:
          return <AdminDashboard />;
      }
    }

    if (role === "Cashier") {
      switch (page) {
        case "cashier_dashboard":
          return <CashierDashboard />;
        case "cashier_billing":
          return <CashierBilling />;
        default:
          return <CashierDashboard />;
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen w-full">
      {/* LOGIN */}
      {page === "login" && (
        <div className="min-h-screen flex items-center justify-center">
          <Home setPage={setPage} setRole={setRole} />
        </div>
      )}

      {/* ADMIN */}
      {page !== "login" && role === "Admin" && (
        <div className="flex min-h-screen">
          <div className="w-[250px] fixed h-screen">
            <AdminSidebar setPage={setPage} activePage={page} onLogout={handleLogout} />
          </div>
          <div className="ml-[250px] flex-1 p-4 bg-gray-100">
            {renderPage()}
          </div>
        </div>
      )}

      {/* CASHIER */}
      {page !== "login" && role === "Cashier" && (
        <div className="flex min-h-screen">
          <div className="w-[250px] fixed h-screen">
            <CashierSidebar setPage={setPage} activePage={page} onLogout={handleLogout} />
          </div>
          <div className="ml-[250px] flex-1 p-4 bg-gray-100">
            {renderPage()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;




















