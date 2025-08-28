import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    image: String,
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
    // deletedAt: Date
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
}, {
    timestamps: true
});

const Banner = mongoose.model("Banner", bannerSchema, "banner");
export default Banner;