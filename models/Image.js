/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
        required: true,
    }
}, { timestamps: true });

ImageSchema.plugin(paginate);

module.exports = mongoose.model("image", ImageSchema);