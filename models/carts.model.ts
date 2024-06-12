import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "products", // tyo product ko reference chai products.models bhittra cha bhanera, exact huna parcha
    },

    //product kasle add gareko thapauna user_id rakheko
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const cartsModel = mongoose.model("carts", cartsSchema);

export default cartsModel;