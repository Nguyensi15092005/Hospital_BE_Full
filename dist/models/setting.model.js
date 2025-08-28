"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const settingSchema = new mongoose_1.default.Schema({
    name: String,
    logo: String,
    logoAdmin: String,
    serviceImagePage: String,
    tintucImagePage: String,
    chuyengiaImagePage: String,
    hotline: String,
    mail_setting: String,
    address: String,
    address_map: String,
    facebook: String,
    tiktok: String,
    zalo: String,
    telegram: String,
    message: String,
    intagram: String,
    footer_right: String,
    about: {
        about_us: String,
        mission: String
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ]
}, {
    timestamps: true
});
const Settings = mongoose_1.default.model("Settings", settingSchema, "settings");
exports.default = Settings;
