const express=require("express");
const Customer =require("../models/customer")

const router = express.Router();

/**
 * @route   POST /api/customers
 * @desc    Add new customer
 */
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      loyaltyPoints,
      address,
      notes,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and Phone number are required",
      });
    }

    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "Customer with this phone number already exists",
      });
    }

    const customer = await Customer.create({
      name,
      phone,
      email,
      loyaltyPoints,
      address,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Customer added successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Add Customer Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * @route   GET /api/customers
 * @desc    Get all customers
 */
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports=router
