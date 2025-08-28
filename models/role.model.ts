import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: Boolean,
    permissions: {  //nhóm quyền
        type: Array,
        default: []
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
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: Date
        }
    ]
},
    {
        timestamps: true
    }
);

const Role = mongoose.model("Role", roleSchema, "roles");
export default Role;