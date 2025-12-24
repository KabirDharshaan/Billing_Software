
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Bill = require("../models/Bill");

/**
 * ADD PRODUCT / ADD BATCH (WITH GST)
 */
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      batchNumber,
      expiryDate,
      price,
      gst,
      quantity,
      barcode,
    } = req.body;

    let product = await Product.findOne({ name });

    if (!product) {
      product = await Product.create({
        name,
        batches: [
          {
            batchNumber,
            expiryDate,
            price,
            gst,
            quantity,
            barcode,
          },
        ],
      });
    } else {
      const batch = product.batches.find(
        (b) => b.batchNumber === batchNumber
      );

      if (batch) {
        batch.quantity += quantity;

        // Optional: update price & GST if needed
        batch.price = price;
        batch.gst = gst;
      } else {
        product.batches.push({
          batchNumber,
          expiryDate,
          price,
          gst,
          quantity,
          barcode,
        });
      }

      await product.save();
    }

    res.json({ success: true, message: "Product added/updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET ALL PRODUCTS
 */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/**
 * GET BATCHES BY PRODUCT NAME
 */
router.get("/batches/:name", async (req, res) => {
  const product = await Product.findOne({ name: req.params.name });
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product.batches);
});

/**
 * EXPIRING PRODUCTS (NEXT 30 DAYS)
 */
router.get("/expiring", async (req, res) => {
  const now = new Date();
  const limit = new Date();
  limit.setDate(limit.getDate() + 30);

  const products = await Product.find();
  const expiring = [];

  products.forEach((p) => {
    p.batches.forEach((b) => {
      if (b.expiryDate && b.expiryDate > now && b.expiryDate <= limit) {
        expiring.push({
          productName: p.name,
          batchNumber: b.batchNumber,
          expiryDate: b.expiryDate,
          quantity: b.quantity,
        });
      }
    });
  });

  res.json(expiring);
});

/**
 * TOP PERFORMING PRODUCTS
 */
router.get("/top-performing", async (req, res) => {
  const data = await Bill.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        soldQty: { $sum: "$items.qty" },
        revenue: {
          $sum: { $multiply: ["$items.qty", "$items.price"] },
        },
      },
    },
    { $sort: { soldQty: -1 } },
    { $limit: 5 },
  ]);

  res.json(data);
});

module.exports = router;
