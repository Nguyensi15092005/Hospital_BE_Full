"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_slug_updater_1 = __importDefault(require("mongoose-slug-updater"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.plugin(mongoose_slug_updater_1.default);
const benhNhanSchema = new mongoose_1.default.Schema({
    fullName: String,
    phone: String,
    cccd: String,
    bhyt: String,
    email: String,
    address: String,
    sex: String,
    status: {
        type: String,
        default: "active"
    },
    dateBirth: Date,
    note: String,
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
const BenhNhan = mongoose_1.default.model("BenhNhan", benhNhanSchema, "benhnhan");
exports.default = BenhNhan;
