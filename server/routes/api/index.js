const router = require("express").Router();
const giftRoutes = require("./gifts");
const listRoutes = require("./lists");
const searchRoutes = require("./search");

// Book routes
router.use("/gifts", giftRoutes);
router.use("/lists", listRoutes);
router.use("/search", searchRoutes);

module.exports = router;
