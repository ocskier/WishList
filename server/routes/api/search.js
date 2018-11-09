const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// Matches with "/api/lists"
router.route("/")
  .get(searchController.searchAll)
  // .post(listsController.create)
  ;

// Matches with "/api/lists/:id"
router
  .route("/:keyword")
  .get(searchController.searchEtsy)
  // .put(listsController.update)
  // .delete(listsController.remove)
  ;

router
  .route("/eb/:word")
  .get(searchController.searchEbay);

router
  .route("/ean/:word")
  .get(searchController.searchEAN);

  // router
//   .route("/user/:id")
//   .get(listsController.findByUser);

module.exports = router;