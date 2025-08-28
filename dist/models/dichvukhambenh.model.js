"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dichVuKhamBenh = new mongoose_1.default.Schema({
    image: String,
    title: String,
    content: String,
    status: Boolean,
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
const DichVuKhamBenh = mongoose_1.default.model("DichVuKhamBenh", dichVuKhamBenh, "dichvukhambenh");
exports.default = DichVuKhamBenh;
