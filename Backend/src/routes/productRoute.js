import express from "express";
import {
  deleteProductController,
  getAllProductController,
  getAllProductListingController,
  getOneProductController,
  paginateProductController,
  postProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", postProductController);
router.get("/allproducts/getAllProducts",getAllProductListingController)
router.post('/pagination',paginateProductController)
router.post("/search",searchProductController)
router.get("/", getAllProductController);
router.get("/:id", getOneProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;
