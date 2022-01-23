/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const ImageActionSchema = new mongoose.Schema({
	user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
	image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "image"
    },
    userAction:{
        type: String,
        required: true,
    },
}, { timestamps: true });

ImageActionSchema.plugin(paginate);

module.exports = mongoose.model("imageAction", ImageActionSchema);