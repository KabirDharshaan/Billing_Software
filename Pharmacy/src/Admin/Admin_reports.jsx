import React, { useEffect, useState } from "react";
import {
  FileDown,
  FileText,
  BarChart3,
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  BarChart,
} from "lucide-react";

/* ---------- SAME DATE FORMAT AS PRODUCT PAGE ---------- */
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AdminReport() {
  const [summary, setSummary] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [expiringProducts, setExpiringProducts] = useState([]);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/reports/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch(console.error);

    fetch("http://localhost:5000/api/reports/top-products")
      .then((res) => res.json())
      .then((data) => setTopProducts(data))
      .catch(console.error);

    fetch("http://localhost:5000/api/reports/expiring-products")
      .then((res) => res.json())
      .then((data) => setExpiringProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      {/* -------------------------------- HEADER -------------------------------- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Reports & Analytics</h1>
          <p className="text-gray-500">Generate insights and export reports</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FileDown size={18} />
            Export PDF
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700">
            <FileText size={18} />
            Generate Report
          </button>
        </div>
      </div>

      {/* --------------------------- FILTER BOX --------------------------- */}
      <div className="bg-white p-5 rounded-xl shadow-sm border mb-8">
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <label className="font-semibold">Report Type</label>
            <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50">
              <option>Sales Report</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Date Range</label>
            <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50">
              <option>Overall</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Export Format</label>
            <select className="w-full mt-1 p-3 border rounded-lg bg-gray-50">
              <option>PDF</option>
            </select>
          </div>
        </div>
      </div>

      {/* --------------------------- STAT CARDS --------------------------- */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign className="w-7 h-7 text-emerald-500" />}
          title="Total Revenue"
          value={`₹${summary?.totalRevenue?.toLocaleString() || 0}`}
          change="Live"
        />

        <StatCard
          icon={<TrendingUp className="w-7 h-7 text-green-600" />}
          title="Net Profit"
          value={`₹${summary?.totalProfit?.toLocaleString() || 0}`}
          change="30% margin"
        />

        <StatCard
          icon={<Package className="w-7 h-7 text-blue-600" />}
          title="Items Sold"
          value={summary?.itemsSold || 0}
          change="Total"
        />

        <StatCard
          icon={<BarChart3 className="w-7 h-7 text-orange-500" />}
          title="Avg. Order Value"
          value={`₹${summary?.avgOrderValue?.toFixed(0) || 0}`}
          change="Per bill"
        />
      </div>

      {/* --------------------------- CHARTS SECTION --------------------------- */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-semibold">Sales & Profit Trend</h2>
              <p className="text-gray-500 text-sm">
                Monthly performance overview
              </p>
            </div>
            <Calendar size={20} className="text-gray-600" />
          </div>

          <div className="h-64 flex items-center justify-center text-gray-400">
            <p>📊 Chart Placeholder</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-semibold">Category-wise Sales</h2>
              <p className="text-gray-500 text-sm">Revenue distribution</p>
            </div>
            <BarChart size={20} className="text-gray-600" />
          </div>

          <div className="h-64 flex items-center justify-center text-gray-400">
            <p>🟢 Pie Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* ---------------- TOP PERFORMING PRODUCTS TABLE ---------------- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-10">
        <h2 className="text-xl font-semibold mb-4">Top Performing Products</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Product Name</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Quantity Sold</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{p.product}</td>
                <td className="p-3">₹{p.revenue.toFixed(0)}</td>
                <td className="p-3">{p.soldQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- EXPIRING PRODUCTS ALERT TABLE ---------------- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Expiring Products Alert
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-100">
              <th className="p-3">Product Name</th>
              <th className="p-3">Batch No</th>
              <th className="p-3">Expiry Date</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Value (₹)</th>
            </tr>
          </thead>

          <tbody>
            {expiringProducts.map((e, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{e.product}</td>
                <td className="p-3">{e.batch}</td>
                <td className="p-3 text-red-600 font-medium">
                  {formatDate(e.expiryDate)}
                </td>
                <td className="p-3">{e.quantity}</td>
                <td className="p-3">₹{e.value.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------- STAT CARD COMPONENT ------------------- */
const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border">
    <div className="mb-3">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <p className="text-green-600 font-medium mt-1">▲ {change}</p>
  </div>
);
