import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import GetAddress from "../components/GetAddress";
import axiosInstance from "../axios";

function PaymentPage() {
  const { user, setUser } = useUserStore();
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Fetching the items available in cart
      const fetchData = async () => {
        const { data, status } = await axiosInstance.get(`/api/cart/get/${user._id}`);

        fetchProduct(data);
        //console.log(data)
      };

      const fetchProduct = async (data) => {
        const newProductData = [];
        for (const unit of data) {
          //console.log(unit._id)
          const { data, status } = await axiosInstance.get(
            `/api/products/${unit.product.productId}`
          );

          newProductData.push({
            ...data,
            size: unit.product.size,
            quantity: unit.product.quantity,
            cartId: unit._id,
          });
        }
        setProducts(newProductData);
      };

      fetchData();
      //console.log(products);
    } catch (error) {
      // console.log(error);
    }
  }, []);

  function getTotalAmount() {
    var total = 0;
    products.map((product) => {
      total = total + product.price * product.quantity;
    });
    return total;
  }

  function procced() {
    if (user.address === undefined) {
      toast.error("Address missing");
    }
    if (user.mobile === undefined) {
      toast.error("Mobile number missing");
    }
    if (!paymentMethod) {
      toast.error("select a payment type");
    }

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    async function getKey() {
      try {
        const res = await axiosInstance.get(`/api/orders/getKey`, config);
        // console.log(res);
        return res.data;
      } catch (err) {
        console.error(err.message);
      }
    }

    const placeOrder = async (body) => {
      try {
        const response = await axiosInstance.post(`/api/orders/create`, body, config);
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    const delFromCart = async () => {
      // console.log("delcart");
      const response = products.map(async (product) => {
        try {
          const res = await axiosInstance.delete(
            `/api/cart/remove/${product.cartId}`
          );
        } catch (error) {
          console.error(error);
        }
      });

    };

    try {
      if (paymentMethod === "cashOnDelivery") {
        // If payment method is cash we are directly adding order
        // console.log(products);
        const body = {
          user: user._id,
          products: products.map((item) => {
            return {
              product: item._id,
              quantity: item.quantity,
              name: item.name,
            };
          }),
          totalAmount: getTotalAmount(),
          paymentType: "cashOnDelivery",
        };
        placeOrder(body);
        delFromCart();
        navigate('/success')
        
      } else if (paymentMethod === "onlinePayment") {
        const makePayment = async () => {
          const stripe = await loadStripe(
            "pk_test_51OFXvhSGECD7it2Q8lUnUVeWQn2pB9JfX7dhDqGDXyb8OWSLz4wYVCXQZPDwUG4YtijZXSGvUEoa828ceAYqXa6000i1VMpgKK"
          );

          const body = {
            user: user._id,
            products: products.map((item) => {
              return {
                product: item._id,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
              };
            }),
            totalAmount: getTotalAmount(),
            paymentType: "onlinePayment",
          };
          const config = {
            headers: { Authorization: `Bearer ${user.token}` },
          };

          const res = await axiosInstance.post(
            "/api/orders/createPaymentSession",
            body,
            config
          );
          // console.log(res);

          const result = stripe.redirectToCheckout({
            sessionId: res.data.id,
          });
          if (res.status === 201) {
            // console.log(201, "hhhahahha");
            placeOrder(body);
            delFromCart();
          }
          // if (result.error) console.log(result.error);
        };
        makePayment();
      }
    } catch (error) {
      console.error(error);
    }

    // console.log(paymentMethod);
  }

  return (
    <div className="flex justify-center items-center">
      <div className="p-4 mx-4 border-2 border-gray-700 md:w-1/2 md:mx-20 flex flex-col ">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          newestOnTop={false}
          closeOnClick
        />
        <div>
          <h2 className="underline mb-2">Details</h2>
          <GetAddress />
        </div>

        <div>
          <div className="pl-56 hidden md:flex justify-between">
            <h3>Product</h3>
            <h3>Quantity</h3>
            <h3>Price</h3>
          </div>
          <hr />
          {products &&
            products.map((product) => {
              return (
                <div className="my-4 flex gap-2 justify-between">
                  <img
                    src={`http://localhost:5000/uploads/${product.imageUrl[0]}`}
                    alt={product.name}
                    className="w-20 h-25 object-contain "
                  />
                  <div className="break-words w-32 ">
                    <h3>{product.name}</h3>
                    <h3>size:{product.size}</h3>
                  </div>

                  <h3>{product.quantity}</h3>
                  <h3>{product.price}</h3>
                </div>
              );
            })}
          <div>Total Amount : {getTotalAmount()}</div>
          <hr />

          <h3 className="text-xl mt-8 mb-4 underline">Payment Method</h3>
          <div>
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cashOnDelivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cod">Cash on delivery</label>
          </div>
          <div>
            <input
              type="radio"
              name="payment"
              id="Pay"
              value="onlinePayment"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="Pay">Online Payment</label>
          </div>
        </div>
        <button
          className="bg-black text-bg px-4 py-2 my-2 md:my-20  w-full"
          onClick={(e) => procced()}
        >
          Procced
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
