const advanceSearch = model => async (req, res, next) => {
  let query;
  // copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from query
  removeFields.forEach(param => delete reqQuery[param]);

  // Stringify it so we can manipulate
  let queryString = JSON.stringify(reqQuery);

  // Find and edit to ($gt, $gte, ...) vvvv
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => {
    return `$${match}`;
  });

  query = model.find(JSON.parse(queryString));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Pagination - Page 1 is default if not specified
  const page = parseInt(req.query.page, 10) || 1;
  // how many to display per page
  const limit = parseInt(req.query.limit, 10) || 25;
  // where to start
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const results = await query;
  // Pagination result
  const pagination = {
    pages: Math.ceil(total / limit)
  };
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  // Filter bad data
  const filteredData = results.filter(
    obj =>
      obj.country !== "Montserrat" &&
      obj.country !== "Total:" &&
      obj.country !== "Diamond Princess"
  );
  res.advancedSearch = {
    success: true,
    count: results.length,
    pagination,
    data: filteredData
  };
  next();
};

module.exports = advanceSearch;
