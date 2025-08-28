import mongoose from "mongoose";

const thechucnang = new mongoose.Schema({
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

const TheChucNang = mongoose.model("TheChucNang", thechucnang, "thechucnang");
export default TheChucNang;