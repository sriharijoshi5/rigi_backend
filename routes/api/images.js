/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../../middleware/authenticate')
const { imageAction,image  } = require('../../controllers/Image');

// @route    GET /api/image
// @desc     Get next image
// @access   Public
router.get('/', authenticateToken, image);

// @route    GET /api/image/:name
// @desc     Action on image
// @access   Public
router.post('/:name', authenticateToken, imageAction);


module.exports = router;