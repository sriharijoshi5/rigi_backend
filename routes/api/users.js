/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp, register } = require('../../controllers/User');
const {authenticateToken} = require('../../middleware/authenticate')


// @route    POST /api/user/sendOtp
// @desc     Send Otp
// @access   Public
router.post('/sendOtp', sendOtp);

// @route    POST /api/user/verifyOtp
// @desc     Verify Otp
// @access   Public
router.post('/verifyOtp', verifyOtp);

// @route    POST /api/user/register
// @desc     Register user
// @access   Public
router.post('/register',authenticateToken, register);

module.exports = router;