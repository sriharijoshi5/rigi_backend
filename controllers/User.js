/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.sendOtp = async(req, res) => {
  User.sendOtp(req, res)
};

module.exports.verifyOtp = async (req, res) => {
  User.verifyOtp(req, res)
};

module.exports.register = async (req, res) => {
  User.register(req, res)
};


