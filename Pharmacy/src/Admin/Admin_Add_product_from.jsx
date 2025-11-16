import React from "react";
import { FiX, FiBarChart } from "react-icons/fi";

export default function AddProductForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <FiX size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Product</h2>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Category</label>
            <select className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300">
              <option>Select category</option>
            </select>
          </div>

          {/* Manufacturer */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Manufacturer</label>
            <input
              type="text"
              placeholder="Enter manufacturer"
              className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300"
            />
          </div>

          {/* Batch Number */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Batch Number</label>
            <input
              type="text"
              placeholder="Enter batch number"
              className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300"
            />
          </div>

          {/* Expiry Date */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              placeholder="0.00"
              className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300"
            />
          </div>

          {/* Stock Quantity */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              placeholder="0"
              className="p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300"
            />
          </div>

          {/* Barcode */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Barcode</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Scan or enter"
                className="flex-1 p-3 rounded-lg border border-gray-300 bg-gray-100 outline-none focus:ring focus:ring-teal-300"
              />
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
                <FiBarChart size={20} />
              </button>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
