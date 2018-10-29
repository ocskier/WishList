const router = require("express").Router();
const giftRoutes = require("./gifts");
const listRoutes = require("./lists");
const listRoutes = require("./users");

// Book routes
router.use("/gifts", giftRoutes);
router.use("/lists", listRoutes);
router.use("/users", userRoutes);

module.exports = router;
