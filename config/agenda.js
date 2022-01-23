/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const Agenda = require("agenda");
let configureMongoDBObj = {
  db: {
    address: process.env.DATABASE_URI,
    collection: "jobs",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
const agenda = new Agenda(configureMongoDBObj);
module.exports = agenda;
