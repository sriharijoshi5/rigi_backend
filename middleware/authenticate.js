/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';

const jwt = require('jsonwebtoken')
const logger = require('../helpers/logger')('authenticate')

exports.authenticateToken = async (req,res,next) => {
    logger.debug(`>>>> authenticateToken`)
    try{
        const autheHeader = req.headers['authorization'];  
        const token = autheHeader && autheHeader.split(' ')[1];
        if ( token == null) return res.sendStatus(401);
    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user) => {
            if(err) return res.sendStatus(403)
            req.user = user;
            next();
        })
    }
    catch(err){
        logger.debug(`authenticateToken - Error: ${err}`)
    }
    finally{
        logger.debug(`<<<< authenticateToken`)
    }

}