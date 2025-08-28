import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    phone: String, 
    status: Boolean,
    role_id: String,
    tokenAdmin: String, 
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
});
const Account = mongoose.model("Account", accountSchema, "accounts");
export default Account;