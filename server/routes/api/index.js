const router = require("express").Router();
const itmesRoutes = require("./items");
const wishlistsRoutes = require("./wishlists");
const usersRoutes = require("./users");

// Book routes
router.use("/items", itmesRoutes);
router.use("/wishlists", wishlistsRoutes);
router.use("/users", usersRoutes);

module.exports = router;
