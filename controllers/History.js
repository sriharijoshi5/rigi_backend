/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';

var utils = require('../utils/writer.js');
var History = require('../service/HistoryService');

module.exports.history = function history (req, res) {
  History.history(req, res)
};
