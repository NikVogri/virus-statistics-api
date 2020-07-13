const router = require('express').Router();
const controller = require('../Controller/dataController');

// Country routes
router.get('/countries/:page', controller.getAllCountries);
router.get('/countries', controller.getAllCountries);
router.get('/country/:country', controller.getOneCountryData);

// Continent routes
router.get('/continents', controller.getAllContinents);
router.get('/countries/continent/:continent/:page', controller.getCountriesInContinents);
router.get('/countries/continent/:continent', controller.getCountriesInContinents);

// Extra routes
router.get('/top-today', controller.getTopToday);
router.get('/countries/previous-day/:page', controller.getCountriesPreviousDayData);
router.get('/world', controller.getWorldData);

module.exports = router;
