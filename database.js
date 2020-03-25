const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(console.log("Connected to database"))
    .catch(err => console.log(err.message));
};

module.exports = connectToDb;
