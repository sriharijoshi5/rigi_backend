/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/
const mongoose = require("mongoose");
const logger = require("../helpers/logger")("db.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    logger.debug(" MongoDB Connected...");
  } catch (err) {
    logger.warn(err.message);
    logger.warn("MongoDB failed to connect, retrying...");
  }
};
const recovery = () => {
  if (!mongoose.connection.readyState) {
    logger.debug("Reconnecting to DB");
    return connectDB();
  }
};

module.exports = { connectDB, recovery };
