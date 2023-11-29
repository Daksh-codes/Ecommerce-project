import express from "express"
import { addToCart , deleteCartItems , getCartItems } from "../controller/cartController.js"
const router = express.Router()

router.post('/create' , addToCart)
router.get('/get/:userId' , getCartItems )
router.delete('/remove/:cartId' , deleteCartItems )

export default router