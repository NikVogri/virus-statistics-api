const router = require("express").Router();
const dataController = require("../controllers/dataController");
const advanceSearch = require("../middleware/advanceSearch");

const Data = require("../models/Statistics");

router.get("/all", advanceSearch(Data), dataController.getAll);
router.get("/stats", dataController.getStatistics);
router.get("/:country", dataController.getCountry);
module.exports = router;
