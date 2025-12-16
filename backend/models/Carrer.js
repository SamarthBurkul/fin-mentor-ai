const mongoose = require("mongoose");

const careerProfileInputSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    currentJobRole: {
      type: String,
      required: true
    },

    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0
    },

    workLocation: {
      type: String,
      default: null
    },

    keySkills: {
      type: [String], // ["React", "Python", "AWS"]
      default: []
    },

    industry: {
      type: String,
      default: null
    },

    educationLevel: {
      type: String,
      enum: [
        "High School",
        "Diploma",
        "Bachelor",
        "Master",
        "PhD",
        "Other"
      ],
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "CareerProfileInput",
  careerProfileInputSchema
);
