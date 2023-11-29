import React, { useEffect, useState } from "react";
import useUserStore from "../store.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import GetAddress from "../components/GetAddress.jsx";
import Loading from "../components/Loading.jsx"
import axiosInstance from "../axios.js";

function Profile() {
  const { userId } = useParams();
  const { user } = useUserStore();
  const [orderHistory, setOrderHistory] = useState();
  const [loading , setLoading ] = useState(false)

  useEffect(() => {
    //Here first we are getting all the values from cart
    //then we are getting product details of the products in the cart
    setLoading(true)
    async function getOrders() {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const res = await axiosInstance.get(
        `/api/orders/getOrdersbyUser/${user._id}`,
        config
      );
      //console.log(res.data);
      const fetchProductData = async () => {
        const newProductData = [];

        for (const order of res.data) {
          // promise.all is a function that runs many promises concurently
          const productsData = await Promise.all(
            order.products.map(async (item) => {
              const res = await axiosInstance.get(`/api/products/${item.product}`);
              return { ...res.data, quantity: item.quantity };
            })
          );

          newProductData.push({
            id: order._id ,
            products: productsData,
            totalAmount: order.totalAmount,
            paymentType: order.paymentType,
            status: order.status,
          });
        }

        setOrderHistory(newProductData);
       
      };
      fetchProductData();
      setLoading(false)
      
    }
    getOrders()
    
  }, []);

  // console.log(user);
  if(loading) {
    return <Loading />
  }

  return (
    <div className="md:mx-20 mx-4">
      <h1 className="my-4   text-xl">
        Hello, {user.firstName} {user.lastName}
      </h1>

      <GetAddress />
      <hr />

      {orderHistory && (
        <div>
          <h3 className="text-xl underline mb-4 ">Order History</h3>

          {orderHistory.map((order) => {
            //console.log(order);
            return (
              <div key={order.id} className="md:w-1/2 w-ful border-2 my-4 border-gray-500">
                <div className="flex justify-between bg-black text-bg w-full font-medium text-lg border-b-2 border-gray-500">
                  <h3 className="ml-2 w-2/5 border-r-2 border-gray-500">Name</h3>
                  <h3 className="ml-16">Price</h3>
                  <h3>Quantity</h3>
                </div>
                {order.products.map((product) => {
                  return (
                    <div key={product._id} className="border-b-2 border-gray-500 flex justify-between  items-center">
                      <h5 className="ml-2 break-words w-2/5 border-r-2 border-gray-500  ">
                        {product.name}
                      </h5>
                      <h5>{product.price}</h5>
                      <h5 className="mr-2">{product.quantity}</h5>
                    </div>
                  );
                })}
                <div className="flex justify-between items-center my-1">
                <h3 className="ml-2">Total Amount : {order.totalAmount}</h3>
                <h3 className="mr-2">Status : {order.status}</h3>
                  </div>
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
