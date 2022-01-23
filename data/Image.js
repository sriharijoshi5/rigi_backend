/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const logger = require('../helpers/logger')('Image.js');
const Image = require("../models/Image");

exports.insertImages = async (data) => {
    logger.debug(">>>> Image - insertImages");
    let imageId;
	try{
		imageId = await Image.insertMany(data);
	}
	catch (err){
		logger.warn(`Image - insertImages - Error: ${err}`);
	}
	logger.debug("<<<< Image - insertImages");
}

exports.getAllImages = async () => {
    logger.debug(">>>> Image - getAllImages");
    let imageCollection;
	try{
		imageCollection = await Image.find();
	}
	catch (err){
		logger.warn(`Image - getAllImages - Error: ${err}`);
	}
	logger.debug("<<<< Image - getAllImages");
	return imageCollection;
}

exports.getImageIdByName = async (name) => {
	logger.debug(">>>> Image - getImageIdByName");
    let imageCollection;
	try{
		imageCollection = await Image.findOne({name: name});
	}
	catch (err){
		logger.warn(`Image - getImageIdByName - Error: ${err}`);
	}
	logger.debug("<<<< Image - getImageIdByName");
	return imageCollection._id;
}

exports.getImageById = async (id) => {
	logger.debug(">>>> Image - getImageById");
    let imageCollection;
	try{
		imageCollection = await Image.findOne({_id: id});
	}
	catch (err){
		logger.warn(`Image - getImageById - Error: ${err}`);
	}
	logger.debug("<<<< Image - getImageById");
	return imageCollection;
}