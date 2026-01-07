
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const bcrypt = require("bcryptjs");
// const User = require("../models/usermodel");

// const router = express.Router();

// /* ========== MULTER CONFIG ========== */
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/users");
//   },
//   filename(req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// /* ========== ADD USER ========== */
// router.post("/add", upload.single("logo"), async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       logo: req.file
//         ? `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`
//         : null,
//     });

//     await user.save();

//     res.status(201).json({
//       success: true,
//       message: "User added successfully",
//       user,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// });

// /* ========== GET ALL USERS ========== */
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find()
//       .select("-password")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       users,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch users",
//     });
//   }
// });

// module.exports = router;






const express = require("express");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/usermodel");

const router = express.Router();

console.log("User routes loaded");

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/users");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= ADD USER (ADMIN / CASHIER) ================= */
router.post("/add", upload.single("logo"), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!["admin", "cashier"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      logo: req.file
        ? `${req.protocol}://${req.get("host")}/${req.file.path.replace(/\\/g, "/")}`
        : null,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        logo: user.logo,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= LOGIN USER ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required",
      });
    }

    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or role mismatch",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        logo: user.logo,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* ================= GET ALL USERS ================= */
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

module.exports = router;
