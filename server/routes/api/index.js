const router = require("express").Router();
const giftRoutes = require("./gifts");
const listRoutes = require("./lists");
const searchRoutes = require("./search");
const userRoutes = require("./users");

// Book routes
router.use("/gifts", giftRoutes);
router.use("/lists", listRoutes);
router.use("/users", userRoutes);
router.use("/search", searchRoutes);

module.exports = router;
