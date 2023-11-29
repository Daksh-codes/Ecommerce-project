import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  createComment,
  deleteComment,
  updateProductById,
  deleteProduct,
  getCommentsByProduct,
  getUniqueSubCategory,
  getUniqueSubCategory2
} from "../controller/productController.js";
import multer from "multer";
import Auth from "../middleware/authMiddleware.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage });

const router = express.Router();

router.post("/create", Auth, upload.array('productImages', 5), createProduct);
router.post("/createComment/:productId",Auth , createComment);

router.get("/", getProducts);
router.get("/:productId", getProductById);
router.get("/comments/:productId" , getCommentsByProduct)
router.get("/unique/subCategory" , getUniqueSubCategory2)
router.get("/unique/subCategory/:category" , getUniqueSubCategory)

router.put("/update/:productId", updateProductById);

router.delete('/deleteComment/:commentId',Auth , deleteComment)
router.delete('/deleteProduct/:productId',Auth ,deleteProduct )
export default router;
