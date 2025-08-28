import mongoose from "mongoose";

const khoaSchema  = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    image: String,
    description: String,
    status: Boolean,
    dateEstablishment: Date, //Ngày thành lập
    headDepartment: String, //trưởng khoa
    deleted:{
        type:Boolean,
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
},{
    timestamps: true
})

const Khoa = mongoose.model("Khoa", khoaSchema, "khoa");
export default Khoa;