// backend/controllers/govController.js
const axios = require("axios");
const { GovBenefitsReport } = require("../models/gov");

const PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions";
const PERPLEXITY_KEY = process.env.PERPLEXITY_API_KEY;

// ---- Perplexity helper using structured JSON output ----
async function callPerplexityJson(prompt, jsonSchema) {
  const res = await axios.post(
    PERPLEXITY_URL,
    {
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "You are FinSaarthi Government Benefits AI for India. " +
            "You MUST answer only using the JSON schema provided.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1200,
      temperature: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: { schema: jsonSchema },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${PERPLEXITY_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  // With structured outputs, content is guaranteed to be valid JSON string.[web:187][web:192]
  return res.data?.choices?.[0]?.message?.content ?? "{}";
}

/**
 * JSON schema for profile report
 * (kept minimal, types only, so the model has freedom but structure is fixed)
 */
const profileReportSchema = {
  type: "object",
  properties: {
    eligibleSchemes: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          category: { type: "string" },
          benefit: { type: "string" },
          frequency: { type: "string" },
          documents: {
            type: "array",
            items: { type: "string" },
          },
          processingTime: { type: "string" },
          eligibilityReason: { type: "string" },
          applicationProcess: {
            type: "array",
            items: { type: "string" },
          },
          officialWebsite: { type: "string" },
        },
        required: [
          "name",
          "type",
          "category",
          "benefit",
          "frequency",
          "documents",
          "processingTime",
          "eligibilityReason",
          "applicationProcess",
          "officialWebsite",
        ],
        additionalProperties: false,
      },
    },
    totalAnnualBenefit: { type: "string" },
    notes: { type: "string" },
    prioritySchemes: {
      type: "array",
      items: { type: "string" },
    },
    documentGuidance: {
      type: "object",
      properties: {
        required: {
          type: "array",
          items: { type: "string" },
        },
        missing: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["required", "missing"],
      additionalProperties: false,
    },
    fraudWarnings: {
      type: "array",
      items: { type: "string" },
    },
    lifeStageAdvice: { type: "string" },
  },
  required: [
    "eligibleSchemes",
    "totalAnnualBenefit",
    "notes",
    "prioritySchemes",
    "documentGuidance",
    "fraudWarnings",
    "lifeStageAdvice",
  ],
  additionalProperties: false,
};

/**
 * JSON schema for scheme report
 */
const schemeReportSchema = {
  type: "object",
  properties: {
    schemeName: { type: "string" },
    type: { type: "string" },
    category: { type: "string" },
    objective: { type: "string" },
    benefits: { type: "string" },
    eligibility: { type: "string" },
    documents: {
      type: "array",
      items: { type: "string" },
    },
    applicationProcess: { type: "string" },
    processingTime: { type: "string" },
    pros: {
      type: "array",
      items: { type: "string" },
    },
    cons: {
      type: "array",
      items: { type: "string" },
    },
    fraudAlerts: {
      type: "array",
      items: { type: "string" },
    },
    verdict: { type: "string" },
  },
  required: [
    "schemeName",
    "type",
    "category",
    "objective",
    "benefits",
    "eligibility",
    "documents",
    "applicationProcess",
    "processingTime",
    "pros",
    "cons",
    "fraudAlerts",
    "verdict",
  ],
  additionalProperties: false,
};

// --------------- PROFILE REPORT ----------------

exports.createProfileReport = async (req, res) => {
  try {
    const userId = req.userId;
    const profile = req.body;

    const prompt = `
Generate a government benefits profile report for this Indian user.

User profile:
- Age: ${profile.age}
- Occupation: ${profile.occupation}
- Annual Income: ₹${profile.income}
- State: ${profile.location}
- Category: ${profile.category}
- Gender: ${profile.gender}
- Marital Status: ${profile.maritalStatus}
- Education Level: ${profile.education}

Follow exactly the provided JSON schema. Do not add or remove fields.
`;

    const content = await callPerplexityJson(prompt, profileReportSchema);

    let result;
    try {
      result = JSON.parse(content.trim());
    } catch (e) {
      console.error("createProfileReport JSON parse error:", e.message);
      console.error("Raw AI content:", content);
      return res
        .status(500)
        .json({ error: "Invalid JSON received from AI service" });
    }

    const report = await GovBenefitsReport.create({
      userId,
      mode: "profile",
      profile,
      result,
    });

    res.status(201).json(report);
  } catch (err) {
    console.error("createProfileReport error message:", err.message);
    console.error("createProfileReport error data:", err.response?.data);
    res.status(500).json({ error: "Failed to generate benefits report" });
  }
};

// --------------- SCHEME REPORT ----------------

exports.createSchemeReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { schemeName } = req.body;

    const prompt = `
Analyze this Indian government scheme: "${schemeName}".
Follow exactly the provided JSON schema. Do not add or remove fields.
`;

    const content = await callPerplexityJson(prompt, schemeReportSchema);

    let result;
    try {
      result = JSON.parse(content.trim());
    } catch (e) {
      console.error("createSchemeReport JSON parse error:", e.message);
      console.error("Raw AI content:", content);
      return res
        .status(500)
        .json({ error: "Invalid JSON received from AI service" });
    }

    const report = await GovBenefitsReport.create({
      userId,
      mode: "scheme",
      schemeName,
      result,
    });

    res.status(201).json(report);
  } catch (err) {
    console.error("createSchemeReport error message:", err.message);
    console.error("createSchemeReport error data:", err.response?.data);
    res.status(500).json({ error: "Failed to generate benefits report" });
  }
};

// --------------- LATEST REPORT ----------------

exports.getLatestReport = async (req, res) => {
  try {
    const userId = req.userId;
    const { mode } = req.query;

    const report = await GovBenefitsReport.findOne({ userId, mode })
      .sort({ createdAt: -1 })
      .lean();

    if (!report) {
      return res.status(404).json({ error: "No report found" });
    }

    res.json(report);
  } catch (err) {
    console.error("getLatestReport error:", err.message);
    res.status(500).json({ error: "Failed to fetch report" });
  }
};
