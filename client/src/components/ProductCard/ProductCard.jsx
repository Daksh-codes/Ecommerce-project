import React, { useState } from "react";
//import "./ProductCard.css";
import { Link } from "react-router-dom";
import starIcon from "../../assets/starIcon.png";
import heartIcon from "../../assets/heart.svg";
function ProductCard(props) {
 // console.log(props);
  const [imgUrl , setImgUrl ] = useState(props.data.imageUrl)
  function handleMouseEnter () {
        setImgUrl(props.data.SImageUrl)
  }

  function handleMouseLeave () {
        setImgUrl(props.data.imageUrl)
  }


  return (
    <Link
      to={`/products/${props.data._id}`}
      className="m-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full border-2 border-bd">
        <img src={imgUrl} alt="Product image" className="w-full" />
        <div className="productText p-3 ">
          <h2 className="break-words">{props.data.name}</h2>
          <div className="productCardText">
            <div className="flex gap-4">
              <h3 className="line-through text-gray-500 ">₹9999</h3>
              <h3>₹{props.data.price}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
