import User from "../model/usermodel.js";
import Product from "../model/productModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST  /api/user/register
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      // hash password
      const salt = await bcrypt.genSalt();
      console.log({ password, salt });
      const hashPassword = await bcrypt.hash(password, salt);
      // create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
      });
      const savedUser = await newUser.save();
      return res.status(201).json({ message: "New user created", savedUser });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Post api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log({ email, password });
    // Check for user
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        //Create a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET);
        const admin = "admin@gmail.com";
        if (user.email === admin) {
          user.isAdmin = true;
        }
        return res.status(200).json({ msg: "Login successful", user, token });
      } else {
        return res.status(401).json({ error: "Invalid password" });
      }
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// PUT /api/users/update/userId
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, mobile, address } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user properties
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (mobile) {
      user.mobile = mobile;
    }
    if (address) {
      user.address = address;
    }
    // Save the updated user
    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addProductToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    user.whislist.push(productId);
    const updatedUser = await user.save();
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const newWishlist = user.wishlist.filter((item) => item !== productId);
    return res.status(200).send(newWishlist);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
