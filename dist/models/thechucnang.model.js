"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const thechucnang = new mongoose_1.default.Schema({
    datlich: {
        icon: String,
        title: String,
        content: String
    },
    tracuu: {
        icon: String,
        title: String,
        content: String
    },
    dichvu: {
        icon: String,
        title: String,
        content: String
    },
    sukien: {
        icon: String,
        title: String,
        content: String
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
const TheChucNang = mongoose_1.default.model("TheChucNang", thechucnang, "thechucnang");
exports.default = TheChucNang;
