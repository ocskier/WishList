const express = require("express");
const router = express.Router();
const passport = require("../../passport");
const userController = require("../../controllers/userController");
const searchController = require("../../controllers/searchController");

// Matches with "/api/users/:id"
// router
//   .route("/userid/:id")
//   .get(userController.findById);

router.get("/user", userController.getUser).put(userController.update);
router.post(
  "/login",
  userController.auth,
  passport.authenticate("local"),
  userController.authenticate
);
router.post("/logout", userController.logout);
router.post("/signup", userController.register);

router.get("/user/lists", userController.getUserLists);

router.get("/searchuser/:query", userController.findAll);

// router
//   .route("/searchuser/")
//   .get(userController.findAll);

router.get("/location", searchController.getLocation);

module.exports = router;
