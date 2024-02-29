const mongoose = require("mongoose");
function connectDB(url) {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((e) => {
      console.error(e);
    });
}

module.exports = connectDB;
