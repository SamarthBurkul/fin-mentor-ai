const express = require("express");
const router = express.Router();

// FIX THIS LINE
const authMiddleware = require("../middleware/auth");

const govController = require("../controllers/govController");

router.use(authMiddleware);

router.post("/report/profile", govController.createProfileReport);
router.post("/report/scheme", govController.createSchemeReport);
router.get("/report/latest", govController.getLatestReport);

module.exports = router;
