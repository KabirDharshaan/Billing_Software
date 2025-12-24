
import React, { useState } from "react";
import { FiX } from "react-icons/fi";

export default function Admin_Add_Product({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    price: "",
    gst: "",          // ✅ ADDED
    quantity: "",
    barcode: "",
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProduct = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          category: form.category,
          manufacturer: form.manufacturer,
          batchNumber: form.batchNumber,
          expiryDate: form.expiryDate,
          price: Number(form.price),
          gst: Number(form.gst),      // ✅ SENT TO BACKEND
          quantity: Number(form.quantity),
          barcode: form.barcode,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product / Batch Added Successfully!");
        onClose();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server Error!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <FiX size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">Add New Product</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Product Name */}
          <input
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Enter product name"
            className="p-2 border rounded"
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handle}
            className="p-2 border rounded"
          >
            <option value="">Select category</option>
            <option value="Pain Relief">Pain Relief</option>
            <option value="Antibiotics">Antibiotics</option>
            <option value="Vitamins">Vitamins</option>
            <option value="Supplements">Supplements</option>
          </select>

          {/* Manufacturer */}
          <input
            name="manufacturer"
            value={form.manufacturer}
            onChange={handle}
            placeholder="Enter manufacturer"
            className="p-2 border rounded"
          />

          {/* Batch Number */}
          <input
            name="batchNumber"
            value={form.batchNumber}
            onChange={handle}
            placeholder="Enter batch number"
            className="p-2 border rounded"
          />

          {/* Expiry Date */}
          <input
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handle}
            className="p-2 border rounded"
          />

          {/* Price (Without GST) */}
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handle}
            placeholder="Base price"
            className="p-2 border rounded"
          />

          {/* GST Percentage */}
          <input
            name="gst"
            type="number"
            value={form.gst}
            onChange={handle}
            placeholder="GST %"
            className="p-2 border rounded"
          />

          {/* Quantity */}
          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handle}
            placeholder="0"
            className="p-2 border rounded"
          />

          {/* Barcode */}
          <input
            name="barcode"
            value={form.barcode}
            onChange={handle}
            placeholder="Scan or enter"
            className="p-2 border rounded col-span-2"
          />
        </div>

        <button
          onClick={submitProduct}
          className="mt-6 bg-teal-600 text-white px-4 py-2 rounded w-full"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

