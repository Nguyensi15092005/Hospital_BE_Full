import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
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
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
},{
    timestamps: true
});
const Contact = mongoose.model("Contact", contactSchema, "contacts");

export default Contact;