import mongoose from "mongoose";

const lichKhamSchema = new mongoose.Schema({
    khoa_id: String,
    bacsi_id: String,
    service: String,
    fullName: String,
    phone: String,
    email: String,
    dateBirth: Date,
    examination_date: Date,
    note: String,
    message_Reply: String,
    status: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
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
},{
    timestamps: true
});

const LichKham = mongoose.model("LichKham", lichKhamSchema, "lichkham");
export default LichKham;