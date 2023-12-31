import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./router/userRouter.js"
import productRouter from "./router/productRouter.js"
import orderRouter from "./router/orderRouter.js"
import cartRouter from "./router/cartRouter.js"
import multer from "multer";
import path from "path"
dotenv.config();
const app = express();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
 const allowedOrigins = ["https://6568a4350843981326f6d72a--darling-torte-d1d4dd.netlify.app", "https://cosmos-git-main-dakshs-projects-b5631377.vercel.app", "https://cosmos-ashen.vercel.app" , "http://localhost:5173"];
app.use(cors({
  origin :allowedOrigins ,    
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//.....................//
// Multer Configration //
//.....................//



//.........//
// Routers //
//.........//
app.get('/' , (req , res) => {
  res.json("It works Hahahhaha")
})
app.use('/api/users' , userRouter )
app.use('/api/products' , productRouter)
app.use('/api/orders' , orderRouter)
app.use('/api/cart' , cartRouter)
app.use("/uploads", express.static("uploads"));




const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('mongoDB working')
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((error) => console.log(`${error.message} did not connect`));
