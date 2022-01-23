/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';

var utils = require('../utils/writer.js');
var Image = require('../service/ImageService');

module.exports.image = function image (req, res) {
  Image.image(req, res)
};

module.exports.imageAction = function imageAction (req, res) {
  Image.imageAction(req, res)
};