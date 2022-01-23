/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const logger = require('../helpers/logger')('User.js');
const User = require("../models/User");

exports.insertUser = async (data) => {
    logger.debug(">>>> User - insert");
    let userId;

	try{
		userId = await User.create(data);
	}
	catch (err){
		logger.warn(`User - insertUser - Error: ${err}`);
	}
	logger.debug("<<<< User - insertUser");
    return userId;
}

exports.updateUser = async (id,name) => {
    logger.debug(">>>> User - updateUser");
	try{
        await User.updateOne({_id: id},
            {$set:{name:name}}, (err, docs) => {
                if (err) {
                    logger.warn(`User - updateUser - Error: ${err}`);
                }
                else {
                    logger.debug(`User - updateUser - Succesful`);
                }
            }
        );
	}
	catch (err){
		logger.warn(`User - update - Error: ${err}`);
	}
	logger.debug("<<<< User - insert");
}

exports.findUserByMobileNumberHash = async (mobileNumberHash) => {
    logger.debug(`>>>> findUserByMobileNumberHash`)
    try{
        const user = await User.findOne({"mobileNumberHash":mobileNumberHash})
        return user ;
    }
    catch(err){
        logger.warn(`findUserByMobileNumberHash - Error: ${err}`);
    }
    finally{
        logger.debug(`<<<< findUserByMobileNumberHash`)
    }

}