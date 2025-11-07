"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trangthietbiSchema = new mongoose_1.default.Schema({
    title: String,
    image: String,
    description: String,
    status: {
        type: Boolean,
        default: true
    },
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
}, {
    timestamps: true
});
const TrangThietBi = mongoose_1.default.model("TrangThietBi", trangthietbiSchema, "trangthietbi");
exports.default = TrangThietBi;
