/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

'use strict';
const express = require('express');
const logger = require('./helpers/logger')('server.js');
const mongoDbConnection = require('./config/db')
const cors = require('cors');
require('dotenv').config();
const {imageDB} = require('./utils/createImageDB')

// setup Image DB connection
mongoDbConnection.connectDB();
// Handle DB down scenario
const handleDbDown = () => {
   setInterval(mongoDbConnection.recovery, 50000);
};
handleDbDown();
const app = express();
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));

// API routes
app.use('/api/user',require('./routes/api/users'))
app.use('/api/image',require('./routes/api/images'))
app.use('/api/history',require('./routes/api/history'))

// default handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
const PORT = process.env.PORT || 3000;

// Initialize the Swagger middleware
app.listen(PORT , async () => {
    logger.info(`Server started on port ${PORT}`);
    imageDB();
})

