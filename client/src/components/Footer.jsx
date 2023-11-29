import React from "react";
import logo from "../assets/logo.jpg";
import secure from "../assets/secure-payment.png";
import discount from "../assets/correct.png"
import box from "../assets/box.png"
import helpDesk from "../assets/help-desk.png"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-screen mt-8 ">
      <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gsp-4 place-items-center w-screen p-5">
        <div className="flex  mb-4">
          <img src={box} alt="free shipping" className="w-20" />
          <div className="p-4">
            <h3>Free Shipping</h3>
            <h5>standard shiping</h5>
          </div>
        </div>
        <div className="flex mb-4">
          <img src={discount} alt="discounts" className="w-20" />
          <div className="p-4">
            <h3>Special Discounts</h3>
            <h5>Guaranteed saving</h5>
          </div>
        </div>

        <div className="flex mb-4">
          <img src={secure} alt="secure Payments" className="w-20" />
          <div className="p-4">
            <h3>Buyers Protection</h3>
            <h5 className="text-gray-600">Secure payments</h5>
          </div>
        </div>

        <div className="flex mb-4">
        <img src={helpDesk} alt="help-desk" className="w-20" />
          <div className="p-4">
            <h3>Customer service</h3>
            <h5>Give us feedback</h5>
          </div>
        </div>
      </div>
      <div className="bg-[#9c9c9c] flex md:flex-row flex-col  gap-4 justify-between px-4 md:px-20 py-4 ">
        <div className="flex flex-col">
          <h1 className="mb-2 text-2xl">Cosmos</h1>
          <h5  className="text-gray-800">Phone : 987654321 </h5>
          <h5  className="text-gray-800">Email : shopAtMinimal@gmail.com</h5>
        </div>
        <div className="flex flex-col">
          <h1 className="mb-2 text-lg">categories</h1>
          <Link to="/products?category=Men" className="text-gray-800">Men </Link>
          <Link to="/products?category=Women" className="text-gray-800">Women</Link>
        </div>

        <div className="flex flex-col">
          <h1 className="mb-2 text-lg">Resources</h1>
          <Link to='/profile' className="text-gray-800">Profile </Link>
          <Link to='/cart' className="text-gray-800">Cart</Link>
        </div> 

      </div>
    </div>
  );
}

export default Footer;
