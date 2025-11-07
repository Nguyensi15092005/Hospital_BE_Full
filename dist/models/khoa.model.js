"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const khoaSchema = new mongoose_1.default.Schema({
    name: String,
    phone: String,
    email: String,
    image: String,
    description: String,
    status: Boolean,
    dateEstablishment: Date,
    headDepartment: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
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
const Khoa = mongoose_1.default.model("Khoa", khoaSchema, "khoa");
exports.default = Khoa;
