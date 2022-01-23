/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const express = require('express');
const router = express.Router();
const { history } = require('../../controllers/History');
const {authenticateToken} = require('../../middleware/authenticate')

// @route    GET /api/image/:name
// @desc     Action on image
// @access   Public
router.get('/',authenticateToken, history);

module.exports = router;