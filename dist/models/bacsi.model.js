"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const bacSiSchema = new mongoose_1.default.Schema({
    fullName: String,
    code: String,
    dateBirth: Date,
    phone: String,
    email: String,
    address: String,
    image: String,
    khoa_id: String,
    degree: String,
    sex: String,
    status: Boolean,
    deleted: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        slug: "fullName",
        unique: true
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
const BacSi = mongoose_1.default.model("BacSi", bacSiSchema, "bacsi");
exports.default = BacSi;
