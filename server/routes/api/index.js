const router = require("express").Router();
const itemRoutes = require("./items");
const listRoutes = require("./lists");

// Book routes
router.use("/gifts", itemRoutes);
router.use("/lists", listRoutes);

module.exports = router;
