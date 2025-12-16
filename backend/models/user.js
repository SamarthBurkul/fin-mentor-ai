const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/* =========================
   CALCULATOR SUB-SCHEMA
========================= */
const calculatorSchema = new mongoose.Schema({
  // EMI
  emi: {
    loanAmount: { type: Number, default: 0 },
    interestRate: { type: Number, default: 0 },
    tenure: { type: Number, default: 0 },
    monthlyEMI: { type: Number, default: 0 },
    totalInterest: { type: Number, default: 0 }
  },

  // SIP
  sip: {
    monthlyAmount: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    years: { type: Number, default: 0 },
    maturityAmount: { type: Number, default: 0 }
  },

  // FD
  fd: {
    principal: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    years: { type: Number, default: 0 },
    maturityAmount: { type: Number, default: 0 }
  },

  // RD
  rd: {
    monthlyAmount: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    years: { type: Number, default: 0 },
    maturityAmount: { type: Number, default: 0 }
  },

  // Interest Calculator
  interest: {
    principal: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    time: { type: Number, default: 0 },
    interestType: {
      type: String,
      enum: ["simple", "compound"],
      default: "compound"
    },
    totalInterest: { type: Number, default: 0 }
  },

  // Savings Growth
  savings: {
    monthlyAmount: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    years: { type: Number, default: 0 },
    totalSavings: { type: Number, default: 0 }
  }
});

/* =========================
   USER SCHEMA
========================= */
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email"
      ]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false
    },

    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
      select: false
    },

    // 🔥 ALL CALCULATORS CONNECTED TO USER
    calculators: {
      type: calculatorSchema,
      default: () => ({})
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

/* =========================
   EXPORT MODEL
========================= */
module.exports = mongoose.model("User", userSchema);
