/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const {getAllImages, getImageIdByName} = require('../data/Image')
const { getSwipedImagesForUserId,updateImageAction } = require('../data/ImageAction')
const { findUserByMobileNumberHash } = require('../data/User')
const {removeByAttr} = require('../utils/filterImages')
const lodash = require('lodash');
const logger = require('../helpers/logger')('ImageService');

// The userToImagesMap array of objects is used 
// to optimize Database requests for images every five seconds
let userToImagesMap = []; 


/**
 * Get image to be shown on home screen
 *
 * no response value expected for this operation
 **/
exports.image = async(req,res) => {
    logger.debug(`>>>> image`)
	try{
        let userIdentifier = req.user.mobileNumberHash;
        let userCollection =await getUserCollection(userIdentifier);
        let name = userCollection.name;
        let userId = userCollection && userCollection._id;
    
        // if the map is empty
        if(!userToImagesMap[userId]){ 
            let imagesForUser = await init(userId);
            userToImagesMap[userId] = imagesForUser;
            logger.debug(`Map is empty for user OR Server has restarted.`)
        }
    
        let imageResponseJson = await imageResponse(name,userId)
        res.json(imageResponseJson)
    }
    catch(err){
        logger.debug(`image - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< image`)
    }

}


/**
 * Request register user after OTP verification
 *
 * body: Image that is swiped left/right (optional)
 * imageName String Name of the image swiped
 * no response value expected for this operation
 **/
 exports.imageAction = async (req,res) => {
    logger.debug(`>>>> imageAction`)
    try{
        let userIdentifier = req.user.mobileNumberHash;
        let userCollection =await getUserCollection(userIdentifier);
        let userId = userCollection && userCollection._id;
        let userName = userCollection.name;
        let body = req.body; 
        let action = body.action;
        let imageName = req.params.name;
        let imageId = await getImageIdByName(imageName)
        
        // if the map is empty
        if(!userToImagesMap[userId]){ 
            let imagesForUser = await init(userId);
            userToImagesMap[userId] = imagesForUser;
        }
    
        let imageActionResponseJson = await imageActionResponse(userId,action,userName,imageName)
        let updateImageActionCollection = await updateImageAction(userId, imageId, action)
    
        res.json(imageActionResponseJson)
    }
    catch(err){
        logger.warn(`imageAction - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< imageAction`)
    }

}


// Below are internal functions, for cleaner code.

// This function is called on initialization
const init = async(userId) => {
    logger.debug(`>>>> init`)
    try{
        let imageCollection = await getAllImages();
        let swipedImages = await getSwipedImagesForUserId(userId);
        let idOfSwipedImages = swipedImages && lodash.map(swipedImages, 'image');
        let removeSwipedImages = await removeByAttr(imageCollection,'_id',idOfSwipedImages)
        return removeSwipedImages;
    }catch(err){
        logger.warn(`init - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< init`)
    }

}


const getUserCollection = async (userIdentifier) => {
    logger.debug(`>>>> getUserCollection`)
    try{
        let userCollection = await findUserByMobileNumberHash(userIdentifier)
        return userCollection
    }
    catch(err){
        logger.warn(`getUserCollection - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< getUserCollection`)
    }

}


const imageActionResponse = async (userId,action,userName,imageName) => {
    logger.debug(`>>>> imageActionResponse`)
    try{
        let imageActionResponseObj;
	
        // Last image loaded on home screen. Thank the user with information.
        if(userToImagesMap[userId].length == 0){
            imageActionResponseObj ={"Message":`${userName}, you have rated all the images. Thank You!`}
        }
    
        // rejected scenario
        else if(action=="left"){
            imageActionResponseObj = {"Message":`${userName}, you have rejected the image ${imageName}`}
        }
        
        // selected scenario
        else if(action=="right"){
            imageActionResponseObj = {"Message":`${userName}, you have selected the image ${imageName}`}
        }
        return imageActionResponseObj;
    }
    catch(err){
        logger.warn(`imageActionResponse - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< imageActionResponse`)
    }

}


const imageResponse = async (userName,userId)=> {
    logger.debug(`>>>> imageResponse`)
    try{
        let imageObjResponse;
        // if there are no images to respond
        if(userToImagesMap[userId].length == 0){
            imageObjResponse ={"Message":`${userName}, you have rated all the images. Thank You!`}
        }
        else{
            imageObjResponse = {"name":userToImagesMap[userId][0].name, url:userToImagesMap[userId][0].url}
            userToImagesMap[userId].splice(0,1)
        }
        return imageObjResponse
    }
    catch(err){
        logger.warn(`imageResponse - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< imageResponse`)
    }

}