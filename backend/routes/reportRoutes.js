const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill");
const Product = require("../models/Product");

/* ---------------- REPORT SUMMARY ---------------- */
router.get("/summary", async (req, res) => {
  try {
    const bills = await Bill.find();

    let totalRevenue = 0;
    let itemsSold = 0;

    bills.forEach((b) => {
      totalRevenue += b.total || 0;
      b.items.forEach((i) => {
        itemsSold += i.qty || 0;
      });
    });

    const totalProfit = totalRevenue * 0.3; // 30% margin
    const avgOrderValue = bills.length
      ? totalRevenue / bills.length
      : 0;

    res.json({
      totalRevenue,
      totalProfit,
      itemsSold,
      avgOrderValue,
      totalBills: bills.length,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate report summary" });
  }
});

/* ---------------- TOP PRODUCTS ---------------- */
router.get("/top-products", async (req, res) => {
  try {
    const bills = await Bill.find();

    const productMap = {};

    bills.forEach((b) => {
      b.items.forEach((i) => {
        if (!productMap[i.name]) {
          productMap[i.name] = {
            product: i.name,
            revenue: 0,
            soldQty: 0,
          };
        }

        productMap[i.name].soldQty += i.qty;
        productMap[i.name].revenue += i.qty * i.price;
      });
    });

    const result = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    res.json(result);
  } catch {
    res.status(500).json({ error: "Failed to fetch top products" });
  }
});

/* ---------------- EXPIRING PRODUCTS ---------------- */
router.get("/expiring-products", async (req, res) => {
  try {
    const products = await Product.find();
    const today = new Date();
    const expiring = [];

    products.forEach((p) => {
      p.batches.forEach((b) => {
        if (!b.expiryDate) return;

        const days =
          (new Date(b.expiryDate) - today) /
          (1000 * 60 * 60 * 24);

        if (days > 0 && days <= 30) {
          expiring.push({
            product: p.name,
            batch: b.batchNumber,
            expiryDate: b.expiryDate,
            quantity: b.quantity,
            value: b.quantity * b.price,
          });
        }
      });
    });

    res.json(expiring);
  } catch {
    res.status(500).json({ error: "Failed to fetch expiring products" });
  }
});

module.exports = router;
