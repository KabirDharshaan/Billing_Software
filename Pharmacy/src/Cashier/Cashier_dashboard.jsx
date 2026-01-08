import React, { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Package,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AdminDashboard = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [weeklySales, setWeeklySales] = useState([]);
  const [pendingBills, setPendingBills] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [expiringSoon, setExpiringSoon] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  // ---------------------- FETCH DASHBOARD DATA ----------------------
  const fetchDashboardData = async () => {
    try {
      /* ---------------------- BILLS ---------------------- */
      const billsRes = await fetch("http://localhost:5000/api/bills");
      const bills = await billsRes.json();

      let total = 0;
      const salesMap = {};

      bills.forEach((bill) => {
        total += bill.total || 0;
        const day = new Date(bill.createdAt).toLocaleString("en-US", {
          weekday: "short",
        });
        salesMap[day] = (salesMap[day] || 0) + (bill.total || 0);
      });

      const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const weekly = weekDays.map((d) => ({
        name: d,
        sales: salesMap[d] || 0,
        profit: (salesMap[d] || 0) * 0.3,
      }));

      setTotalSales(total);
      setWeeklySales(weekly);
      setPendingBills(0); // you don't have bill status logic yet

      /* ---------------------- PRODUCTS ---------------------- */
      const productsRes = await fetch("http://localhost:5000/api/products");
      const products = await productsRes.json();

      let low = 0;
      let expiring = 0;

      products.forEach((p) => {
        p.batches.forEach((b) => {
          if (b.quantity <= 0) return;
          if (b.quantity < 10) low++;

          if (b.expiryDate) {
            const days =
              (new Date(b.expiryDate) - new Date()) /
              (1000 * 60 * 60 * 24);
            if (days > 0 && days <= 30) expiring++;
          }
        });
      });

      setLowStock(low);
      setExpiringSoon(expiring);

      /* ---------------------- TOP PRODUCTS ---------------------- */
      const topRes = await fetch(
        "http://localhost:5000/api/products/top-performing"
      );
      const top = await topRes.json();
      setTopProducts(top);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-500">Welcome back! Here’s what’s happening today.</p>

      {/* ---------------- STATS CARDS ---------------- */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card
          icon={<DollarSign className="text-white" />}
          bg="bg-teal-600"
          title="Total Sales"
          value={`₹${totalSales.toLocaleString()}`}
          percent="+"
          positive
        />
        <Card
          icon={<ShoppingCart className="text-white" />}
          bg="bg-blue-600"
          title="Bills Created"
          value={weeklySales.reduce((a, b) => a + (b.sales > 0 ? 1 : 0), 0)}
          percent=""
          positive
        />
        <Card
          icon={<AlertTriangle className="text-white" />}
          bg="bg-orange-600"
          title="Low Stock Batches"
          value={lowStock}
          percent=""
          positive
        />
        <Card
          icon={<Clock className="text-white" />}
          bg="bg-red-600"
          title="Expiring Soon"
          value={expiringSoon}
          percent=""
          positive
        />
      </div>

      {/* ---------------- CHARTS ---------------- */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* SALES OVERVIEW */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-semibold">Sales Overview</h2>
              <p className="text-gray-500 text-sm">
                Weekly sales and profit trends
              </p>
            </div>
            <TrendingUp className="text-teal-600" />
          </div>

          <LineChart width={500} height={260} data={weeklySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#0d9488" strokeWidth={3} />
            <Line type="monotone" dataKey="profit" stroke="#14b8a6" strokeWidth={3} />
          </LineChart>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-semibold">Top Performing Products</h2>
              <p className="text-gray-500 text-sm">
                Based on quantity sold
              </p>
            </div>
            <Package className="text-teal-600" />
          </div>

          {topProducts.length === 0 ? (
            <p className="text-gray-400">No sales data yet</p>
          ) : (
            topProducts.map((p, i) => (
              <div
                key={i}
                className="flex justify-between border-b py-2 text-sm"
              >
                <span>{p._id}</span>
                <span className="font-semibold">{p.soldQty} sold</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

/* ---------------- CARD COMPONENT ---------------- */
const Card = ({ icon, bg, title, value, percent, positive }) => (
  <div className="bg-white rounded-xl shadow p-5 flex gap-4 items-start">
    <div className={`${bg} p-3 rounded-xl text-white`}>{icon}</div>
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <p className="font-medium">{title}</p>
        {percent && (
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              positive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
            {percent}
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold mt-2">{value}</h3>
    </div>
  </div>
);
