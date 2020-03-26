const Data = require("../models/Statistics");
const ErrorRes = require("../Utils/errorRes");
const asyncHandler = require("../middleware/async");
// Gets all data for all countries
exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedSearch);
});

// Gets data for a specific country
exports.getCountry = asyncHandler(async (req, res, next) => {
  const { country } = req.params;
  const data = await Data.findOne({ country });

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
    data
  });
});

// Get only stats
exports.getStatistics = asyncHandler(async (req, res, next) => {
  const data = await Data.findOne({ country: "Total:" });
  if (!data) {
    return next(new ErrorRes("Server error", 500));
  }
  res.status(200).json({
    success: true,
    data: getStats(data)
  });
});

// Get only total stats without countries
const getStats = data => {
  // Get total statistics
  data.country = undefined;
  return data;
};
