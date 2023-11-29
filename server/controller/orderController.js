import Order from "../model/orderModel.js";
import crypto from "crypto";
import stripe from "stripe";
const stripeInstance = stripe(
  "sk_test_51OFXvhSGECD7it2Qqp5l1CPEkXo3Xui2zaQMOjJNwErU42xE7qK29UKOAz2xwjpFkz6vdGl5QNHrH4LCgxsNvCd500pdUj3jXU"
);
const YOUR_DOMAIN = "http://localhost:5173";
export const payment = async (req, res) => {
  try {
    const { user, products, totalAmount, paymentType } = req.body;
    const line_items = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",

      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });
    //console.log(session);
    res.status(201).send({ id: session.id });
  } catch (error) {
    //console.log(error);
    res.status(500).send(error);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { user, products, totalAmount, status, paymentType } = req.body;
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      status,
      paymentType,
    });
    const savedOrder = await newOrder.save();

    return res.status(201).send(savedOrder);
  } catch (error) {
    //console.log(error.message);
    return res.status(500).send(error.message);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).send("Order not found");
    }
    return res.status(200).send("Order Deleted succesfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const orders = await Order.find({ user: userId });
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
