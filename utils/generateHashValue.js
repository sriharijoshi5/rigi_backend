/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const hash = require('object-hash');
const logger = require('../helpers/logger')('generateHashValue')

exports.getHashValue = async (obj) => {
    logger.debug(`>>>> getHashValue`)
    try{
        const hashId = await hash(obj)
        return hashId;
    }
    catch(err){
        logger.warn(`getHashValue - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< getHashValue`)
    }

}