"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const aboutSchema = new mongoose_1.default.Schema({
    image: String,
    about_us: String,
    mission: String,
    value: String,
    why_choose_us: String,
    team: {
        imageTeam: String,
        description: String
    },
    device: {
        imageDevice: String,
        description: String,
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
const About = mongoose_1.default.model("About", aboutSchema, "about");
exports.default = About;
