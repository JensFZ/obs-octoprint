"use strict";
const express = require("express");
const router = express.Router();

router.get("/progress", (req, res, next) => {
	res.render("progress");
});

router.get("/ETA", (req, res, next) => {
	res.render("ETA");
});

router.get("/info", (req, res, next) => {
	res.render("info");
});

module.exports = router;
