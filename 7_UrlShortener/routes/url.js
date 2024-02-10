const express = require("express");
const {
  handleGenNewShortURl,
  handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenNewShortURl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
