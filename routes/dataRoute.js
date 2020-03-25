const router = require("express").Router();
const dataController = require("../controllers/dataController");

router.get("/all", dataController.getAll);
router.get("/stats", dataController.getStatistics);
router.get("/:country", dataController.getCountry);
module.exports = router;
