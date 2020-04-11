const Country = require("../models/Country");
const Continent = require("../models/Continent");
const ErrorRes = require("../Utils/errorRes");
const asyncHandler = require("../middleware/async");

// Gets all data for all countries
exports.getAllCountries = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedSearch);
});

// Gets all data for all continents
exports.getAllContinents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedSearch);
});

// Gets data for a specific country
exports.getCountry = asyncHandler(async (req, res, next) => {
  const { country } = req.params;
  const data = await Country.findOne({ country });

  if (!data) {
    return next(
      new ErrorRes(
        "Could not find any data for that country or that country does not exist",
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getContinent = asyncHandler(async (req, res, next) => {
  const { continent } = req.params;
  const data = await Continent.find({ Continent: continent });

  if (!data) {
    return next(
      new ErrorRes(
        "Could not find any data for that continent or that continent does not exist",
        400
      )
    );
  }
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getCountriesInContinent = asyncHandler(async (req, res, next) => {
  const { continent } = req.params;

  const page = parseInt(req.params.page, 10) || 1;
  // how many to display per page
  const limit = parseInt(req.query.limit, 10) || 25;
  // where to start
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Country.countDocuments({ Continent: continent });
  const data = await Country.find({ Continent: continent })
    .skip(startIndex)
    .limit(limit);

  if (!data) {
    return next(
      new ErrorRes(
        "Could not find any data for that continent or that continent does not exist",
        400
      )
    );
  }

  // Pagination result
  const pagination = {
    pages: Math.ceil(total / limit),
  };
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    pagination,
    count: data.length,
    data,
  });
});
