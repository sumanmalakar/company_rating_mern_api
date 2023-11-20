import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // user:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:"User", // Schema name,
  //     require:true
  // },
  ratings: [{ type: Number }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Company = mongoose.model("Company",companySchema);