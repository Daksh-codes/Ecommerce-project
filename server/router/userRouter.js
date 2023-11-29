import express from "express";
import { registerUser , loginUser , updateUser , removeFromWishlist , addProductToWishlist } from "../controller/userController.js";
import Auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser );
router.post("/login", loginUser );
router.post("/wishlist/create/:userId/:productId" , addProductToWishlist)

router.put("/update/:userId", Auth , updateUser );

router.delete("/wishlist/delete/:userId/:productId" , removeFromWishlist)
export default router