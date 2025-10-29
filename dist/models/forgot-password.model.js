"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 180
    }
}, {
    timestamps: true
});
const ForgotPassword = mongoose.model('ForgetPassword', forgotPasswordSchema, "forgot-password");
exports.default = ForgotPassword;
