import Product from "../model/productModel.js";
import { Comment } from "../model/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const values = req.body;
    const product = await Product.findOne({ name: values.name });

    if (product) {
      return res.status(401).send("Product already exists");
    } else {
      const filenames = req.files.map((file) => file.originalname);
      values.imageUrl = filenames;

      const newProduct = new Product(values);
      const savedProduct = await newProduct.save();
      return res
        .status(201)
        .send({ data: savedProduct, message: "New product created" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const products = await Product.findById(productId);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getUniqueSubCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if(category === '' ) {
      console.log(category)
      return res.status(200).send('')
    }
    const products = await Product.find({category : category});
    const sub = products.map((p) => p.subCategory)
    const distictValues = [...new Set(sub)]
    return res.status(200).send(distictValues );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getUniqueSubCategory2 = async (req, res) => {
  try {
    const distictValues = await Product.distinct('subCategory')
    return res.status(200).send(distictValues );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


//getUniqueSubCategory()

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }
    return res.status(200).send("Product deleted");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).send(updatedProduct);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//..........................//
// Controllers for comments //
//..........................//

export const createComment = async (req, res) => {
  try {
    const { productId } = req.params;
    const { username, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const newcomment = {
      username,
      comment,
    };
    product.comments.push(newcomment);
    const savedComment = await product.save();

    return res.status(201).send(savedComment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ product: productId });
    if (!comments) {
      return res.status(200).send("No comments found");
    }
    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send(deletedComment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
