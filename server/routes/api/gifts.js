const router = require("express").Router();
const giftsController = require("../../controllers/giftsController");

// Matches with "/api/gifts"
router.route("/")
  .get(giftsController.findAll)
  .post(giftsController.create);

// Matches with "/api/gifts/:id"
router
  .route("/:id")
  .get(giftsController.findById)
  .put(giftsController.update)
  .delete(giftsController.remove);

module.exports = router;
