/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const OtpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    otp: {
        type: mongoose.Schema.Types.Number,required:false,
        required: true,
    }
}, { timestamps: true });

OtpSchema.plugin(paginate);

module.exports = mongoose.model("otp", OtpSchema);