import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store.js";
import removeBtn from "../assets/bin.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PaymentPage from "./PaymentPage.jsx";
import Loading from "../components/Loading.jsx";
import axiosInstance from "../axios.js";

function Cart() {
  const { user } = useUserStore();
  const [data, setData] = useState([]);
  const [productdata, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setIsLoading(true);
      // Fetching the items available in cart
      const fetchData = async () => {
        const { data, status } = await axiosInstance.get(`/api/cart/get/${user._id}`);
        setData(data);
      };
      fetchData();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {

    try {
      setIsLoading(true);
      // Fetching all the details of the products in the cart
      const fetchProductData = async () => {
        const newProductData = [];

        for (const unit of data) {
          const { data, status } = await axiosInstance.get(
            `/api/products/${unit.product.productId}`
          );
          const newData = {
            ...data,
            quantity: unit.product.quantity,
            size: unit.product.size,
            cartid: unit._id,
          };
          newProductData.push(newData);
        }
        setProductData(newProductData);
        setIsLoading(false);
      };
      fetchProductData().then(setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  const totalMRP = () => {
    var total = 0;
    productdata.map((data) => {
      total = total + data.price;
    });

    return total;
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axiosInstance.delete(`/api/cart/remove/${productId}`);
      if (response.status === 200) {
        // Item was successfully removed from the cart, so update the productdata state
        const updatedProductData = productdata.filter(
          (item) => item.cartid !== productId
        );
        setProductData(updatedProductData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const placeOrder = async () => {
    navigate("/paymentPage");
  };

  if (productdata.length == 0)
    return <h1 className="text-center">Cart is empty</h1>;

  if (isLoading) return <Loading />;

  return (
    <div className="flex mb-20  flex-col lg:flex-row md:justify-between mx-4 lg:px-20 w-[90vw] h-screen">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
      />
      <div>
        <h1 className="my-4">You have {productdata.length} items in cart</h1>
        <div className="hidden md:flex justify-between py-2 my-4 border-y border-bd w-full md:w-[60vw] text-xl">
          <h1 className="grow-[4]">Product</h1>
          <h1 className="grow">Price</h1>
          <h1 className="grow">Quantity</h1>
          <h1 className="grow">Total</h1>
          <h1 className="grow">&nbsp;&nbsp;&nbsp;&nbsp; </h1>
        </div>
        {productdata.map((data) => {
          //console.log(data);
          return (
            <div className="flex justify-between gap-2 my-4 w-full">
              <Link className="w-[50%] md:w-[30%]" to={`/products/${data._id}`}>
                <div className="flex  gap-4 w-full  ">
                  <img
                    src={`https://cosmos-api2.onrender.com/uploads/${data.imageUrl[0]}`}
                    alt={data.name}
                    className="w-20 h-25 object-contain"
                  />
                  <div className="">
                    <h1 className="break-words text-l ">{data.name}</h1>
                    <h3>Size: {data.size}</h3>
                  </div>
                </div>
              </Link>
              <h1>₹{data.price}</h1>
              <div>
                <h1>{data.quantity}</h1>
              </div>
              <h1>{data.price * data.quantity}</h1>

              <button
                className="border-[1px] h-max py-1 px-2 hover:bg-gray-200  "
                onClick={() => {
                  removeFromCart(data.cartid);
                }}
              >
                Delete
                {/* <img className="w-[25px] h-[25px]" src={removeBtn} alt="delete" /> */}
              </button>
            </div>
          );
        })}
      </div>

      <div className="md:border-l mt-4 md:ml-4 border-bd md:h-3/5  md:px-8 py-2 ">
        <div className="w-[90vw] md:w-64">
          <h1 className=" text-xl mb-2">{`Price details (${productdata.length} item)`}</h1>
          <div className="w-[90vw]  md:w-60 flex-col flex  gap-2">
            <div className="flex justify-between">
              <h1>Total MRP:</h1>
              <h1>₹{totalMRP()}</h1>
            </div>
            <div className="flex justify-between">
              <h1>Discount on MRP:</h1>
              <h1>₹0</h1>
            </div>
            <div className="flex justify-between">
              <h1>Coupon Discount</h1>
              <h1>₹0</h1>
            </div>
            <div className="flex justify-between">
              <h1>Convenience fee:</h1>
              <h1>₹0</h1>
            </div>
            <div className="flex justify-between border-t border-stone-300 text-xl">
              <h1 className="">Total Amount </h1>
              <h1 className="">₹{productdata.length ? totalMRP() : `0`}</h1>
            </div>
            <button
              className="w-full bg-accent hover:shadow-stripe hover:bg-accent/70  my-4 p-3"
              onClick={() => placeOrder()}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
