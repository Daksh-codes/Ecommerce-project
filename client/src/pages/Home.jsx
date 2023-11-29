import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import axios from "axios";
import ErrorPage from "../components/404Error/404Error";
import { Link } from "react-router-dom";
import accountIcon from "../assets/user.svg";
import shopWomen from "../assets/shopWomen.jpg";
import shopMen from "../assets/shopMen.jpg";
import salesBanner from "../assets/profileBanner2.png";
import Loading from "../components/Loading";
import axiosInstance from "../axios";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Base URL set to:", axios.defaults.baseURL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axiosInstance.get("/api/products/");
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <ErrorPage />;
  }

  return (
    <div className="hiscreen ">

      {/* Main banner  */}
      <div className="mt-16">
        <div className="flex gap-4  justify-center m-4">
          <Link
            to="/products?category=Women"
            className="w-3/5 lg:w-2/5 lg:h-2/5 overflow-hidden object-contain"
          >
            <img src={shopWomen} alt="shopWomen" />
            <div className="py-4 bg-[#404040]">
              <h1 className="pl-4 text-[#ffffff] ">Shop WOMEN</h1>
            </div>
          </Link>
          <Link
            to="/products?category=Men"
            className=" w-3/5 lg:w-2/5 lg:h-2/5 object-contain"
          >
            <img src={shopMen} alt="shopMen" />
            <div className="py-4 bg-[#404040]">
              <h1 className="pl-4 text-[#ffffff]">Shop MEN</h1>
            </div>
          </Link>
        </div>
        <div className="flex justify-center m-4">
          <img
            src={salesBanner}
            alt="use code new20 for discount"
            className="lg:w-4/5"
          />
        </div>
      </div>


      {/* {console.log(data[0])} */}
      <h1 className="md:text-5xl text-4xl text-center mt-8 md:mt-20  md:mb-4">
        New in
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <ProductCard
          data={{
            ...data[10],
            imageUrl: `http://localhost:5000/uploads/${data[10].imageUrl[0]}`,
            SImageUrl: `http://localhost:5000/uploads/${data[10].imageUrl[1]}`,
          }}
        />
        <ProductCard
          data={{
            ...data[15],
            imageUrl: `http://localhost:5000/uploads/${data[15].imageUrl[0]}`,
            SImageUrl: `http://localhost:5000/uploads/${data[15].imageUrl[1]}`,
          }}
        />
        <ProductCard
          data={{
            ...data[35],
            imageUrl: `http://localhost:5000/uploads/${data[35].imageUrl[0]}`,
            SImageUrl: `http://localhost:5000/uploads/${data[35].imageUrl[1]}`,
          }}
        />
        <ProductCard
          data={{
            ...data[19],
            imageUrl: `http://localhost:5000/uploads/${data[19].imageUrl[0]}`,
            SImageUrl: `http://localhost:5000/uploads/${data[19].imageUrl[1]}`,
          }}
        />
      </div>
      <div>
        <h1 className="md:text-5xl text-4xl text-center mt-8 md:mt-20  md:mb-4">
          Best Seller
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <ProductCard
            data={{
              ...data[17],
              imageUrl: `http://localhost:5000/uploads/${data[17].imageUrl[0]}`,
              SImageUrl: `http://localhost:5000/uploads/${data[17].imageUrl[1]}`,
            }}
          />
          <ProductCard
            data={{
              ...data[16],
              imageUrl: `http://localhost:5000/uploads/${data[16].imageUrl[0]}`,
              SImageUrl: `http://localhost:5000/uploads/${data[16].imageUrl[1]}`,
            }}
          />
          <ProductCard
            data={{
              ...data[31],
              imageUrl: `http://localhost:5000/uploads/${data[31].imageUrl[0]}`,
              SImageUrl: `http://localhost:5000/uploads/${data[31].imageUrl[1]}`,
            }}
          />
          <ProductCard
            data={{
              ...data[26],
              imageUrl: `http://localhost:5000/uploads/${data[26].imageUrl[0]}`,
              SImageUrl: `http://localhost:5000/uploads/${data[26].imageUrl[1]}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;


