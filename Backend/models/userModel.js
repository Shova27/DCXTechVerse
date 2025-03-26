const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    address: {
        add1: { type: String, default: "" }, // Street name
        add2: { type: String, default: "" }, // Apartment and floor details
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        zip: { type: String, default: "" }
    },
},{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);
