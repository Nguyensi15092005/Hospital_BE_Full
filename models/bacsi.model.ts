import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const bacSiSchema = new mongoose.Schema ({
    fullName: String,
    code: String,
    dateBirth: Date, 
    phone: String,
    email: String, 
    address: String,
    image: String,
    khoa_id: String,
    degree: String, //học vị
    sex: String, //giới tính
    status: Boolean,
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
})

const BacSi = mongoose.model("BacSi", bacSiSchema, "bacsi");

export default BacSi;

