import mongoose, { Schema } from "mongoose";

// Define the Size subdocument schema
const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ["s", "m", "l", "xl", "xxl"],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

// Define the Color subdocument schema
// const colorSchema = new mongoose.Schema({
//   color: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   sizeSchema: [sizeSchema],
// });

// Image Schema
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
});

//Define the comments subdocument schema
const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  comment: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    required: true,
    enum: ["Men", "Women"],
  },
  subCategory: String,
  tags: [],
  size: [sizeSchema],
  imageUrl: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  comments: [commentSchema],
  material: {
    type: String,
    required: true,
  },
  Specifications: [
    {
      specName: {
        type: String,
        required: true,
      },
      specValue: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);
export const Comment = mongoose.model("Comment", commentSchema);
export default Product;

/*
{
  "name": "Donald Duck 34 Oversized Jersey",
    "desc": "",
    "price": 799,
    "category": "Men",
    "subCategory": "Oversized tee",
    "tags" : ["mens oversized tshirt" ,"black"],
    "size" : [
    {
      "size" : "m" ,
      "stock" : 23
    },
    {
      "size" : "l" ,
      "stock" : 20
    },
    {
      "size" : "xl" ,
      "stock" : 3
    }
    ],
    "comments" : [],
     "material" : "Cotton" ,
    "Specifications" : [ {
        "specName" : "Sleeve length" ,
        "specValue" : "Half sleeves" 
    } , 
    {
        "specName" : "Neckline" ,
        "specValue" : "v neck" 
    },
    {
        "specName" : "Fit" ,
        "specValue" : "Oversized drop shoulder" 
    },
    {
        "specName" : "Weight" ,
        "specValue" : "230g" 
    }
    
    ]
}

*/

