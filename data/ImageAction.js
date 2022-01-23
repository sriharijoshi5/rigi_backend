/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const ImageAction = require('../models/ImageAction')
const logger = require('../helpers/logger')('ImageAction.js');

exports.getSwipedImagesForUserId = async (userId) => {
    logger.debug(">>>> ImageAction - getSwipedImagesForUserId");
    let swipedImageCollection;
	try{
		swipedImageCollection = await ImageAction.find({"user":userId});
	}
	catch (err){
		logger.warn(`ImageAction - getSwipedImagesForUserId - Error: ${err}`);
	}
	logger.debug("<<<< ImageAction - getSwipedImagesForUserId");
	return swipedImageCollection;
}

exports.updateImageAction = async (userId, imageId,userAction) => {
	logger.debug(">>>> ImageAction - updateImageAction");
    let swipedImageCollection;
	try{
        ImageAction.updateOne({user: userId,image:imageId},
            {$set:{userAction:userAction}},{ upsert : true }, (err, docs) => {
                if (err) {
                    logger.warn(`ImageAction - updateImageAction - Error: ${err}`);
                }
                else {
                    logger.debug(`ImageAction - updateImageAction - Succesful`);
                }
            }
        );
	}
	catch (err){
		logger.warn(`ImageAction - updateImageAction - Error: ${err}`);
	}
	logger.debug("<<<< ImageAction - updateImageAction");
	return swipedImageCollection;
}

