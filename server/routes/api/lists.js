const router = require("express").Router();
const listsController = require("../../controllers/listsController");

// Matches with "/api/lists"
router.route("/")
  .get(listsController.findAll)
  .post(listsController.create);

// Matches with "/api/lists/:id"
router
  .route("/:id")
  .get(listsController.findById)
  .put(listsController.update)
  .delete(listsController.remove);

router
  .route("/user/:id")
  .get(listsController.findByUser);

module.exports = router;