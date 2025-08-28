import mongoose from "mongoose";

const dichVuKhamBenh = new mongoose.Schema({
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
    // deletedAt: Date
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
}, {
    timestamps: true
});
const DichVuKhamBenh = mongoose.model("DichVuKhamBenh", dichVuKhamBenh, "dichvukhambenh");
export default DichVuKhamBenh;