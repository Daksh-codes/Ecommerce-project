import React from "react";
import { Link } from "react-router-dom";
import cancelIcon from "../assets/remove.png";
function OrderCancel() {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="flex flex-col items-center  md:gap-4">
        <img src={cancelIcon} alt="payment successfull" className="md:w-20 w-10" />
        <h1 className='text-xl font-semibold' >Failed to place order</h1>
        <p className='text-gray-700' >
          To continue shopping click on{" "}
          <Link to="/" className="font-semibold underline" >
            {" "}
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
export default OrderCancel;
