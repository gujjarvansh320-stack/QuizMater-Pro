const express = require("express");
const router = express.Router();

const { sendTestEmail } = require("../controllers/testController");

router.get("/email", sendTestEmail);

module.exports = router;