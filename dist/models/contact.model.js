"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    fullName: String,
    email: String,
    phone: String,
    note: String,
    message_Reply: String,
    status: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
}, {
    timestamps: true
});
const Contact = mongoose_1.default.model("Contact", contactSchema, "contacts");
exports.default = Contact;
