import mongoose from "mongoose";

const adminAccountsSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const adminAccountsModel = mongoose.model("adminaccounts", adminAccountsSchema);

export default adminAccountsModel ;