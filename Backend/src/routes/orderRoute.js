import express from "express";
import {
  capturePaypalOrder,
  // checkOutPayment,
  getOneOrderController,
  getOrderController,
  getUserOrderController,
  paginateOrderController,
  paypalPayment,
  postOrderController,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/placeOrder", postOrderController);
router.post('/pagination',paginateOrderController)
router.get("/", getOrderController);
router.get("/:id", getOneOrderController);
router.get("/selected/:userId",getUserOrderController)
// router.post("/create-checkout-session",checkOutPayment)
router.post("/",paypalPayment)
router.post("/capture-paypal-order/:orderID",capturePaypalOrder)

export default router;
