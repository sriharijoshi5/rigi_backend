/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const jwt = require('jsonwebtoken')
const {getOtp} = require('../utils/generateOtp')
const {getHashValue} = require('../utils/generateHashValue')
const {getJwtToken} = require('../middleware/jwtSign')
const {insertUser, findUserByMobileNumberHash, updateUser} = require('../data/User')
const {insertOtp, updateOtpByUserId, findOtpByUserId} = require('../data/Otp')
const logger = require('../helpers/logger')('UserService');

/**
 * Request register user after OTP verification
 *
 * body User User enters name and registers (optional)
 * no response value expected for this operation
 **/
exports.register = async (req,res) => {
	logger.debug(`>>>> register`)
	try{
		// check DB for already registered scenario and store if not
		let mobileNumberHash = req.user.mobileNumberHash;
		let name = req.body.name;
		let userCollection = await findUserByMobileNumberHash(mobileNumberHash)
		if(userCollection && userCollection.name){
		res.json({
			"Status": "User already registered"
		})
		logger.debug(`register - User already registered`)
		}
		else{
		let update = await updateUser(userCollection._id,name)
		res.json({
			"Status": "User registered succesfully"
		})
		logger.debug(`register - User registered succesfully`)
		}
	}
	catch(err){
		logger.warn(`register - Error: ${err}`)
	}
	finally{
		logger.debug(`<<<< register`)
	}
}

/**
 * Request to send OTP
 *
 * body User User Phone number that needs to be sent message to (optional)
 * no response value expected for this operation
 **/
exports.sendOtp = async (req, res) => {
	logger.debug(`>>>> sendOtp`)
  try{
	const mobileNo = req.body.mobileNo
	const mobNoObj = {
	  mobileNo: mobileNo
	}
	const mobileNumberHash = await getHashValue(mobNoObj)
	const otp = await getOtp(mobileNo) // generates random four digit number (instead of 0000)
	
	// store both in DB
	let userCollection = await findUserByMobileNumberHash(mobileNumberHash)
	let userId = userCollection && userCollection._id;
	let otpId;
	if(!userId){ // no previous entry
	  userId  = await insertUser({"mobileNumberHash":mobileNumberHash})
	  otpId = await insertOtp({"user":userId,"otp":otp})
	}
	else{
	  otpId = await updateOtpByUserId(userId,otp)
	}
	res.json(otp)
	logger.debug(`sendOtp - otp: ${otp}`)
  }catch(err){
	logger.warn(`sendOtp - Error: ${err}`)
  }finally{
	logger.debug(`<<<< sendOtp`)
  }

}

/**
 * Request to verifyOtp
 *
 * body User_verifyOtp_body User enters the OTP that needs to be verified (optional)
 * no response value expected for this operation
 **/
exports.verifyOtp = async (req,res) => {
	logger.debug(`>>>> verifyOtp`)

	try{
		const body = req.body
		const mobileNo = body.mobileNo;
		const mobNoObj = {
		  mobileNo: mobileNo
		}
		const mobileNumberHash = await getHashValue(mobNoObj)
		let userCollection = await findUserByMobileNumberHash(mobileNumberHash)
		let storedOtp = userCollection && await findOtpByUserId(userCollection._id)
	  
		const receivedOtp = body.otp;
		if(storedOtp === receivedOtp){
		  const user = { mobileNumberHash: mobileNumberHash };
		  const accesToken = await getJwtToken(user)
		  res.json({accesToken: accesToken})
		  logger.debug(`verifyOtp - OTP Verification Successful. Responded with bearer token`)
		}else{
		  res.json({"Status":"OTP verification failed"})
		  logger.debug(`verifyOtp - OTP Verification failed.`)
		}
	}
	catch(err){
		logger.warn(`verifyOtp - Error: ${err}`)
	}
	finally{
		logger.debug(`<<<< verifyOtp`)
	}
}