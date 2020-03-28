const app = require("express")();
const connectToDb = require("./database");
const dataRoute = require("./routes/dataRoute");
const errorHandler = require("./middleware/errorHandler");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config({
    path: "./config.env"
  });
}

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 150 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use("/api/v1", dataRoute);
app.use(errorHandler);
const port = process.env.PORT || 3000;
connectToDb();
app.listen(port, () => {
  console.log("Server started on port " + port + " in " + process.env.NODE_ENV);
});
