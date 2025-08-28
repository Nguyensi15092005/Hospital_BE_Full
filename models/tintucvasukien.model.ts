import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
const tintucSukien = new mongoose.Schema({
    image: String,
    title: String,
    content: String,
    status: Boolean,
    deleted: {
        type: Boolean,
        default: false
    },
    slug:{
        type: String,
        slug:"title",
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
    // deletedAt: Date
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
}, {
    timestamps: true
});

const TinTuc = mongoose.model("TinTuc", tintucSukien, "tintucSukien");
export default TinTuc;