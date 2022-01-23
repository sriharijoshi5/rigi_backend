/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';

const logger = require('../helpers/logger')('generateOtp')

exports.getOtp = async () => {
    logger.debug(`>>>> getOtp`)
    try{
        const val = Math.floor(1000 + Math.random() * 9000);
        return(val);
    }
    catch(err){
        logger.warn(`getOtp - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< getOtp`)
    }

}