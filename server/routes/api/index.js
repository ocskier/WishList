const router = require("express").Router();
const giftRoutes = require("./gifts");
const listRoutes = require("./lists");

// Book routes
router.use("/gifts", giftRoutes);
router.use("/lists", listRoutes);

module.exports = router;
