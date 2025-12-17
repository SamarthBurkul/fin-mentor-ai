const mongoose = require("mongoose");

const govBenefitsReportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mode: { type: String, enum: ["profile", "scheme"], required: true },

    // profile-based search
    profile: {
      age: String,
      occupation: String,
      income: String,
      location: String,
      category: String,
      gender: String,
      maritalStatus: String,
      education: String,
    },

    // scheme name (for scheme analysis)
    schemeName: String,

    // full JSON response from AI (same shape you use on frontend)
    result: { type: Object, required: true },
  },
  { timestamps: true }
);

const GovBenefitsReport = mongoose.model(
  "GovBenefitsReport",
  govBenefitsReportSchema
);

module.exports = { GovBenefitsReport };
