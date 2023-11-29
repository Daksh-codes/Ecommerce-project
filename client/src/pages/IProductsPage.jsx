import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../components/404Error/404Error.jsx";
import useUserStore from "../store.js";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading.jsx"
import axiosInstance from "../axios.js";


function IProductsPage() {
  const { productId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: response, status } = await axiosInstance.get(
          `/api/products/${productId}`
        );
        setData(response);
        setSizes(response.size);
        setImageList(response.imageUrl);
        setSelectedImage(response.imageUrl[0]);
      } catch (error) {
        //console.log(error.message);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addToCart = async () => {
    try {
      if (!user) {
        navigate("/login");
      }

      if (selectedSize === "") {
        toast.error("Please select a size");
      }
      const response = await axiosInstance.post("/api/cart/create", {
        userId: user,
        product: { productId, quantity, size: selectedSize },
      });
      if (response.status === 201) {
        toast.success("Product added to cart");
      }
      //console.log(response.status)
    } catch (error) {
      //console.log(error.message)
    }
  };

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <ErrorPage />;
  }
  //console.log(data)
  return (
    <div className="flex mx-4  gap-2 md:gap-14 flex-col lg:flex-row ">
      {/* product image */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
      />
      {selectedImage === "" ? (
        <img
          src={`http://localhost:5000/uploads/${data.imageUrl[0]}`}
          alt="Product Image"
          className="object-contain  h-[70vh] w-[100%] lg:h-screen lg:w-max "
          //  style={{ width: "50vw", height: "100vh" }}
        />
      ) : (
        <img
          src={`http://localhost:5000/uploads/${selectedImage}`}
          alt="Product Image"
          className="object-contain h-[70vh] w-[100%] lg:h-screen lg:w-max "
          // style={{ width: "50vw", height: "100vh" }}
        />
      )}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex gap-2 flex-row md:flex-col  md:mt-10">
          {imageList.map((img) => (
            <img
              src={`http://localhost:5000/uploads/${img}`}
              alt="Product Image"
              className={`object-contain w-12 h-12 lg:h-24 ${
                selectedImage === img ? " border-cyan-600 border-2" : ""
              }`}
              // style={{ width: "8vw", height: "15vh" }}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>
      {/* product info */}
      <div className="flex-col gap-1 my-0 md:w-[40vw] w-[90vw]">
        {/* product title */}
        <h3 className="text-4xl font-medium text-gray-700 my-4 break-words">
          {data.name}
        </h3>

        {/* product price */}
        <div className="flex items-center font-medium text-2xl my-4 gap-4">
          <h3 className="text-black-600">₹{data.price}</h3>
          {/* <h3 className="flex text-gray-400">
            {" "}
            <h3 className="ml-1 line-through">₹999</h3>
          </h3> */}
        </div>
        <hr />
        <div className=" flex justify-between items-center my-4">
          <h1 className="text-m">Select size</h1>
          <h1 className=" text-gray-800 underline hover:cursor-pointer">
            Size chart &gt;
          </h1>
        </div>

        {/* product sizes  */}
        <div className="flex items-center my-4">
          <div className="flex gap-2 ">
            {sizes.map((unit) => {
              if (unit.stock > 0) {
                return (
                  <button
                    className={` border-2 w-8 ${
                      selectedSize === unit.size ? `border-gray-800` : ``
                    }`}
                    onClick={() => setSelectedSize(unit.size)}
                  >
                    {unit.size}
                  </button>
                );
              }
            })}
          </div>
        </div>

        {/* size chart */}

        {/* Add2cart and wishlist */}
        <div className="flex items-center gap-8 text-base">
          <div>
            <div className="bg-gray-800 text-gray-200 py-1 pl-1 pr-8 items-center gap-4 flex justify-center my-4">
              <div className="bg-gray-200 text-gray-800 flex ">
                <button
                  onClick={() => {
                    quantity > 1
                      ? setQuantity((state) => state - 1)
                      : setQuantity(1);
                  }}
                  className="px-2 py-1 bg-white border-2"
                >
                  -
                </button>
                <button className="px-2 py-1 bg-white border-2">
                  {quantity}
                </button>

                <button
                  onClick={() => setQuantity((state) => state + 1)}
                  className="px-2 py-1 bg-white border-2"
                >
                  +
                </button>
              </div>
              <button className="px-4" onClick={addToCart}>
                Add to cart
              </button>
            </div>
          </div>
          {/* wishlist */}
          {/* <div className="flex gap-4 px-4 ">
            <img src={heartIcon} alt="wishlist" className="w-3" />
            <p>Add to Wishlist</p>
          </div> */}
        </div>
        <hr />

        {/* specification */}
        <div className="my-8">
          <h3 className="text-xl text-gray-700 my-4">Product Details : </h3>
          <div className="flex text-lg">
            <p className="text-gray-950">Material : </p>{" "}
            <p className="text-gray-500"> {data.material}</p>
          </div>
          <div className="flex text-lg">
            <p className="text-gray-950">Category : </p>{" "}
            <p className="text-gray-500">{data.category}</p>
          </div>

          {data.Specifications &&
            data.Specifications.map((spec) => (
              <div className="flex text-lg ">
                <p className="text-gray-950">{spec.specName}</p>: {"  "}
                <p className="text-gray-500">{spec.specValue}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default IProductsPage;
