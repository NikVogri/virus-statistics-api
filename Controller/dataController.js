const ErrorRes = require("../Utils/errorRes");
const asyncHandler = require("../Middleware/async");
const dbConnection = require('../database');


// Gets all data for all countries
exports.getAllCountries = asyncHandler(async (req, res, next) => {
  const currPage = req.params.page || 1;
  const perPage = 20;
  const query = `SELECT * FROM countries WHERE DATE(created_at) = CURDATE()
                 LIMIT ${perPage} OFFSET ${(currPage * perPage) - perPage}`;
   await dbConnection.query(query, (err, results) => {
    if (err) {
      return next(
        new ErrorRes(
          "Could not fetch country data, please try again",
          500
        )
      );
      dbConnection.end();
    }
    res.status(200).json({
      success: true,
      page: parseInt(currPage),
      results: results.length,
      data: results
    });
  });
});

// Gets all data for all continents
exports.getAllContinents = asyncHandler(async (req, res, next) => {
  await dbConnection.query('SELECT * FROM continents WHERE DATE(created_at) = CURDATE()', (err, results) => {
    if (err) {
      return next(
        new ErrorRes(
          "Could not fetch continent data, please try again",
          500
        )
      );
      dbConnection.end();
    }
    res.status(200).json({
      success: true,
      data: results
    });
  });
});

exports.getCountriesInContinents = asyncHandler(async (req, res, next) => {
  const continentName = req.params.continent;
  const currPage = req.params.page || 1;
  const perPage = 20;
  const query = `SELECT * FROM countries WHERE continent LIKE '%${continentName}%' && DATE(created_at) = CURDATE()
                LIMIT ${perPage} OFFSET ${(currPage * perPage) - perPage}`;
  await dbConnection.query(query, (err, results) => {
    if (err) {
      return next(
        new ErrorRes(
          "Could not fetch countries from this continent data, please try again",
          500
        )
      );
      dbConnection.end();
    }
    res.status(200).json({
      success: true,
      page: parseInt(currPage),
      results: results.length,
      data: results
    });
  });
});

// Gets data for one country by searching with country name
exports.getOneCountryData = asyncHandler(async (req, res, next) => {
  const countryName = req.params.country;
  const query = `SELECT * FROM countries WHERE country = '${countryName}'`;
  await dbConnection.query(query, (err, results) => {
    if (err) {
      return next(
        new ErrorRes(
          "Could not fetch country data, please try again",
          500
        )
      );
      dbConnection.end();
    }
    res.status(200).json({
      success: true,
      data: results
    });
  });
});


// Gets data for highest infection rises the day it runs
exports.getTopToday = asyncHandler(async (req, res, next) => {
const query = `SELECT * FROM countries WHERE DATE(created_at) = CURDATE() ORDER BY newCases DESC LIMIT 3`;
await dbConnection.query(query, (err, results) => {
  if (err) {
    return next(
      new ErrorRes(
        "Could not fetch country data, please try again",
        500
      )
    );
    dbConnection.end();
  }
  res.status(200).json({
    success: true,
    data: results
  });
});
});


// Gets data for previous today
exports.getCountriesPreviousDayData = asyncHandler(async (req, res, next) => {
  const currPage = req.params.page || 1;
  const perPage = 20;
  const query = `SELECT * FROM countries WHERE DATE(created_at) = CURDATE() - INTERVAL 1 DAY
                 LIMIT ${perPage} OFFSET ${(currPage * perPage) - perPage}`;
   await dbConnection.query(query, (err, results) => {
    if (err) {
      return next(
        new ErrorRes(
          "Could not fetch country data, please try again",
          500
        )
      );
      dbConnection.end();
    }
    res.status(200).json({
      success: true,
      page: parseInt(currPage),
      results: results.length,
      data: results
    });
  });
});

// Gets data for world
exports.getWorldData = asyncHandler(async (req, res, next) => {
  const query = `SELECT * FROM continents WHERE continent = 'All'`;
  await dbConnection.query(query, (err, results) => {
    if (err) {
      return next(
        new ErrorRes(
          "Could not fetch country data, please try again",
          500
        )
      );
      dbConnection.end();
    }
    res.status(200).json({
      success: true,
      data: results
    });
  });
});
