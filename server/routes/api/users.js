const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
  .get(userController.findAll);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(userController.findById);

module.exports = router;
