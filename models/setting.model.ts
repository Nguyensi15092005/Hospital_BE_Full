import mongoose from "mongoose";

const settingSchema = new mongoose.Schema({
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
const Settings = mongoose.model("Settings", settingSchema, "settings");

export default Settings;