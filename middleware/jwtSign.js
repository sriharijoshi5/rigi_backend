/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const jwt = require('jsonwebtoken')
const logger = require('../helpers/logger')('jwtSign');

exports.getJwtToken = async (obj) => {
    logger.debug('>>>> getJwtToken')
    try{
        const accesToken = jwt.sign(obj,process.env.ACCESS_TOKEN_SECRET)
        return accesToken
    }
    catch(err){
        logger.warn(`getJwtToken - Error: ${err}`)
    }finally{
        logger.debug(`<<<< getJwtToken`)
    }

}