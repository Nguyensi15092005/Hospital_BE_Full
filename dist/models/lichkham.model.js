"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lichKhamSchema = new mongoose_1.default.Schema({
    khoa_id: String,
    bacsi_id: String,
    service: String,
    fullName: String,
    phone: String,
    email: String,
    dateBirth: Date,
    examination_date: Date,
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
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ],
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
}, {
    timestamps: true
});
const LichKham = mongoose_1.default.model("LichKham", lichKhamSchema, "lichkham");
exports.default = LichKham;
