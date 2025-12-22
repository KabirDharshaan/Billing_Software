const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    batches: [
      {
        batchNumber: { type: String, required: true },
        expiryDate: { type: Date },   // ✅ FIXED
        price: { type: Number, default: 0 },
        quantity: { type: Number, required: true },
        barcode: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
