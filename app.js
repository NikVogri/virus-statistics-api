const app = require("express")();
const connectToDb = require("./database");
const dataRoute = require("./routes/dataRoute");
const errorHandler = require("./middleware/errorHandler");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config({
    path: "./config.env"
  });
}

app.use("/api/v1", dataRoute);
app.use(errorHandler);

const port = process.env.PORT || 3000;
connectToDb();
app.listen(port, () => {
  console.log("Server started on port " + port + " in " + process.env.NODE_ENV);
});
