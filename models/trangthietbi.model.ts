import mongoose from "mongoose";

const trangthietbiSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  status: {
    type: Boolean,
    default: true
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
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ],
},{
  timestamps: true
});

const TrangThietBi = mongoose.model("TrangThietBi", trangthietbiSchema, "trangthietbi");
export default TrangThietBi;