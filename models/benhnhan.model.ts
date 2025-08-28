import slug from 'mongoose-slug-updater';
import mongoose from "mongoose";

mongoose.plugin(slug)

const benhNhanSchema = new mongoose.Schema ({
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
    dateBirth : Date, 
    note: String,
    deleted:{
        type:Boolean,
        default: false
    },
    slug:{
        type: String,
        slug:"fullName",
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

},{
    timestamps: true
});

const BenhNhan = mongoose.model("BenhNhan", benhNhanSchema, "benhnhan");
export default BenhNhan;