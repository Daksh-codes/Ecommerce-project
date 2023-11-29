import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      required: true,
      enum: ["s", "m", "l", "xl", "xxl"],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Cart = mongoose.model("Cart", cartSchema);
export const Whislist = mongoose.model("Whislist", cartSchema);

export default Cart;
