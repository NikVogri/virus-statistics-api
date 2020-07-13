const express = require('express');
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require('./Middleware/errorHandler');
//Router
const router = require('./Routes/dataRouter');

const app = express();

//middlewares
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 150 // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(cors());
app.use(limiter);

app.use("/api/v2", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
