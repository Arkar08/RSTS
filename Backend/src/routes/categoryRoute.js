import express from "express";
import {
  deleteCategoryController,
  dropdownCategoryController,
  getAllCategoryController,
  getAllCategoryListController,
  getOneCategoryController,
  paginateCategoryController,
  postCategoryController,
  postCategoryProductController,
  searchCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { authorizeAdmin, authorizeCustomer } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", postCategoryController);
router.get("/selected/:id",postCategoryProductController)
router.post("/pagination",paginateCategoryController)
router.post("/search",searchCategoryController)
router.get("/dropdown",dropdownCategoryController)
router.get("/", getAllCategoryController);
router.get("/:id", getOneCategoryController);
router.put("/:id", updateCategoryController);
router.delete("/:id", deleteCategoryController);
router.get("/allcategory/getAllCategory",getAllCategoryListController)

export default router;
