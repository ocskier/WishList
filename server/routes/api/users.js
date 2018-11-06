const router = require("express").Router();
const userController = require("../../controllers/userController");
const searchController = require("../../controllers/searchController");

router.route("/all")
  .get(userController.findAll);

// Matches with "/api/users/:id"
router
  .route("/userid/:id")
  .get(userController.findById);

router
  .route("/searchuser/:query")
  .get(userController.findAll);
  
router
  .route("/searchuser/")
  .get(userController.findAll);

  router
  .route("/location")
  .get(searchController.getLocation);

module.exports = router;
