import Auth from "../middleware/authMiddleware.js"
import express from "express"
import {createOrder , deleteOrder , getOrdersByUser, payment  } from "../controller/orderController.js"
const router = express.Router()

router.post('/create' ,Auth , createOrder )
router.post("/createPaymentSession", Auth , payment );
router.get('/getOrdersbyUser/:userId' ,Auth , getOrdersByUser)
router.get('/getKey' ,Auth , (req , res ) =>  res.status(200).send(process.env.PAYMENT_KEYID))
router.delete('/delete/:orderId' ,Auth , deleteOrder)



export default router