/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const logger = require('../helpers/logger')('Otp.js');
const Otp = require("../models/Otp");

exports.insertOtp = async (data) => {
    logger.debug(">>>> Otp - insertOtp");
    let otpId;
	try{
		otpId = await Otp.create(data);
	}
	catch (err){
		logger.warn(`Otp - insertOtp - Error: ${err}`);
	}
	logger.debug("<<<< Otp - insertOtp");
    return otpId;
}

exports.updateOtpByUserId = async (id,otp) => {
    logger.debug(">>>> Otp - updateOtpByUserId");
    let otpId;
	try{
        await Otp.updateOne({user: id},
            {$set:{otp:otp}}, (err, docs) => {
                if (err) {
                    logger.warn(`Otp - updateOtpByUserId - Error: ${err}`);
                }
                else {
                    logger.debug(`Otp - updateOtpByUserId - Succesful`);
                }
            }
        );
	}
	catch (err){
		logger.warn(`Otp - updateOtpByUserId - Error: ${err}`);
	}
	logger.debug("<<<< Otp - updateOtpByUserId");
    return otpId;
}

exports.findOtpByUserId = async (userId) => {
    logger.debug(`>>>> findOtpByUserId`)
    try{
        const otpCollection = await Otp.findOne({"user":userId})
        return otpCollection && otpCollection.otp;
    }
    catch(err){
        logger.warn(`>>>> findOtpByUserId - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< findOtpByUserId`)
    }

}