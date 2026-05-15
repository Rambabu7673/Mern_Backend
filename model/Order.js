import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quentity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
   name:"String",
   addressLine:"String",
   city:"String",
   state:"String",
   pincode:"Number",
   phoneNumber:"Number"
  },
  totalAmount: Number,
  paymentMethod: {
    type: String,
    default: "cod", 
  },
  status: {
    type: String,
    default: "Placed",
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },

});

export const Order = mongoose.model("Order", orderSchema);