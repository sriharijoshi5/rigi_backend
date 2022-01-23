/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';

const {findUserByMobileNumberHash} = require('../data/User')
const {getSwipedImagesForUserId} = require('../data/ImageAction')
const {getImageById} = require('../data/Image')
const logger = require('../helpers/logger')('HistoryService.js')


/**
 * List all previous operations on image with timestamp
 *
 * no response value expected for this operation
 **/
exports.history = async (req,res) => {
	logger.debug(`>>>> history`)
	try{
		let mobileNumberHash = req.user.mobileNumberHash;
		let userCollection = await findUserByMobileNumberHash(mobileNumberHash);
		let swipedImages = await getSwipedImagesForUserId(userCollection._id);
		let historyJson = await getHistoryJson(swipedImages)
		res.json(historyJson)
	}
	catch(err) {
		logger.warn(`history - Error: ${err.message}`)
	}
	finally{
		logger.debug(`<<<< history`)
	}

}


// Below are internal functions, for cleaner code.

const getHistoryJson = async (swipedImages) => {
	logger.debug(`>>>> getHistoryJson`)
	try{
		let historyJson = []
		for await(let image of swipedImages) {
			let imageAttributes = await getImageAttributes(image.image)
			let dateTime = await formatDateTime(image.updatedAt)
			let jsonObj = {name:imageAttributes.name,url:imageAttributes.url,action:image.userAction,dateTime:dateTime}
			historyJson.push(jsonObj)
		}
		return historyJson;
	}
	catch(err) {
		logger.warn(`getHistoryJson - Error: ${err}`)
	}
	finally{
		logger.debug(`<<<< getHistoryJson`)
	}

}

const getImageAttributes = async (imageId) => {
	logger.debug(`>>>> getImageAttributes`)
	try{
		const imageAttributes = await getImageById(imageId)
		return imageAttributes;
	}
	catch(err){
		logger.warn(`getImageAttributes - Error: ${err}`)
	}
	finally{
		logger.debug(`<<<< getImageAttributes`)
	}

}

const formatDateTime = async (dateTime) => {
    logger.debug(`>>>> formatDateTime`)
    try{
        let newDate = new Date(dateTime);
        let options = { timeZone: 'UTC', month: 'long', year: 'numeric' , day: 'numeric', hour: 'numeric' , minute: 'numeric', second: 'numeric'};
        let formattedDateTime = newDate.toLocaleDateString("en-US", options) + " UTC";
        return formattedDateTime;
    }
    catch (error){
        logger.warn("formatDateTime - Error: ${err}`")
    }
    finally {
        logger.debug(`<<<< formatDateTime`)
    }
}