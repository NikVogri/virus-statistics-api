const router = require("express").Router();
const dataController = require("../controllers/dataController");
const advanceSearch = require("../middleware/advanceSearch");

const Country = require("../models/Country");
const Continent = require("../models/Continent");

router.get("/all", advanceSearch(Country), dataController.getAllCountries);

router.get(
  "/all/continent",
  advanceSearch(Continent),
  dataController.getAllContinents
);

router.get("/country/:country", dataController.getCountry);
router.get("/continent/:continent", dataController.getContinent);
router.get(
  "/continent/find-countries/:continent/:page",
  dataController.getCountriesInContinent
);
module.exports = router;
