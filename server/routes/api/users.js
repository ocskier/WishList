const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/all")
  .get(userController.findAll);

// Matches with "/api/users/:id"
router
  .route("/userid/:id")
  .get(userController.findById)
  .put(userController.update);

router
  .route("/searchuser/:query")
  .get(userController.findAll);

router
  .route("/searchuser/")
  .get(userController.findAll);


module.exports = router;
