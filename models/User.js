/*
***********************************************************
# Sjoshi Rigi_Backend
***********************************************************
*/

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    mobileNumberHash: {
        type: String,
        required: true,
    }
}, { timestamps: true });

UserSchema.plugin(paginate);

module.exports = mongoose.model("user", UserSchema);