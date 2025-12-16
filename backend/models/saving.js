const mongoose = require("mongoose");

const savingSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  dailyAmount: {
    type: Number,
    required: true,
    min: 1
  },

  currency: {
    type: String,
    default: "INR"
  },

  startDate: {
    type: Date,
    default: Date.now
  }
});


const dailySavingLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  amountSaved: {
    type: Number,
    required: true,
    min: 0
  },

  isGoalCompleted: {
    type: Boolean,
    default: false
  }
});


const lifeGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  goalName: {
    type: String,
    required: true
  },

  targetAmount: {
    type: Number,
    required: true
  },

  currentSavedAmount: {
    type: Number,
    default: 0
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  targetDate: {
    type: Date
  },

  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  }
});
