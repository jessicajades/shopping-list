const express = require("express");
const router = express.Router();

const listController = require("../controllers/listController");

router.get("/lists/index", listController.index);

module.exports = router;
