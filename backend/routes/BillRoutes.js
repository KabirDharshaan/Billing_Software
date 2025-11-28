const express =require( "express");
const Bill =require("../models/Bill.js");

const router = express.Router();

// CREATE BILL
router.post("/", async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: "Failed to create bill" });
  }
});

// GET ALL BILLS
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bills" });
  }
});

// GET SINGLE BILL
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: "Bill not found" });
  }
});

// DELETE BILL
router.delete("/:id", async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ error: "Unable to delete bill" });
  }
});

module.exports=router;
