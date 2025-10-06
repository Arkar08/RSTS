import mongoose from "mongoose";
import {
  createOrderService,
  findEmailService,
  findOneOrderService,
  findOrderService,
  findUserOrderService,
  paginationOrderService,
} from "../services/orderService.js";
import { findOneProductOrderService } from "../services/productService.js";
import axios from "axios";
import dotenv from "dotenv";
import { io } from "../server.js";

dotenv.config();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = process.env.PAYPAL_API;


async function generateAccessToken() {
  const response = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: "post",
    auth: {
      username: PAYPAL_CLIENT_ID,
      password: PAYPAL_SECRET,
    },
    data: "grant_type=client_credentials",
  });
  return response.data.access_token;
}

export const postOrderController = async (req, res) => {
  const { userId, products, delivery } = req.body;

  if (!userId  || !delivery) {
    return res.status(400).json({
      status: 400,
      message: "Please fill out all required fields.",
    });
  }

  try {
    let totalPayment = 0;
    const updatedProducts = [];

    for (const item of products) {
      const productInDB = await findOneProductOrderService(item._id);

      if (!productInDB) {
        return res.status(404).json({ message: `Product not found.` });
      }

      if (productInDB.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${productInDB.name}. Only ${productInDB.quantity} left. Please check your order.`,
        });
      }
    }

    for (const item of products) {
      const productInDB = await findOneProductOrderService(item._id);

      productInDB.quantity -= item.quantity;
      await productInDB.save();

      const itemTotalPrice = productInDB.price * item.quantity;
      const itemCustomerPrice = productInDB.customerSalePrice * item.quantity;
      const priceDummy = productInDB.customerSalePrice
        ? itemCustomerPrice
        : itemTotalPrice;

      totalPayment += priceDummy;

      updatedProducts.push({
        product: item._id,
        image: productInDB.images[0],
        name: productInDB.name,
        quantity: item.quantity,
        totalPrice: priceDummy,
      });
    }


    const data = {
      userId,
      products: updatedProducts,
      totalPayment: totalPayment,
      delivery,
      status:"PickUp"
    };

    const findEmail = await findEmailService(data);
    if (!findEmail) {
      return res.status(400).json({
        status: 400,
        message: "Email does not exist.",
      });
    }

    const createOrder = await createOrderService(data);
    if (!createOrder) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.",
      });
    }else{
      io.emit('newOrder',createOrder)

      return res.status(201).json({
        status: 201,
        message: "Order created successfully.",
        data: createOrder,
      });
    }

    
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
};

export const getOrderController = async (req, res) => {
  try {
    const data = await findOrderService();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Order Successfully.",
        data: data,
      });
    } else {
      return res.status(500).json({
        message: "Something Went Wrong.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const getOneOrderController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }

  try {
    const data = {
      id: id,
    };
    const findOrder = await findOneOrderService(data.id);
    if (findOrder) {
      return res.status(200).json({
        status: 200,
        message: "Fetch One Order Successfully.",
        data: findOrder,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Not Found Order",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const paginateOrderController = async (req, res) => {
  const { page } = req.body;

  if (!page) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const order = await paginationOrderService(page, 10);
    if (order) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Orders Successfully.",
        data: order,
      });
    } else {
      return res.status(500).json({
        message: "Something Went Wrong.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const getUserOrderController = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }
  try {
    const data = {
      userId: userId,
    };
    const userOrder = await findUserOrderService(data);
    if (userOrder) {
      return res.status(200).json({
        status: 200,
        message: "Fetch One User Order Successfully.",
        data: userOrder,
        total: userOrder.length,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

// export const checkOutPayment = async (req, res) => {
//   const { products } = req.body;

//   const lineItems = products.map((product) => ({
//     price_data: {
//       currency: "aud",
//       product_data: {
//         name: product.name,
//         images: [product.images[0]],
//       },
//       unit_amount: product.price * 100,
//     },
//     quantity: product.quantity,
//   }));
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:5173/success",
//     cancel_url: "http://localhost:5173/cancel",
//   });
//   res.json({ id: session.id });
// };

export const paypalPayment = async (req, res) => {
  try {
    const { products, shipingFee } = req.body;
    const accessToken = await generateAccessToken();

    const totalAmount =
      products.reduce((sum, product) => {
        const price = product.customerSalePrice
          ? product.customerSalePrice
          : product.price;
        return sum + price * product.quantity;
      }, 0) + shipingFee;

    const line_items = products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      unit_amount: {
        currency_code: "AUD",
        value: product.customerSalePrice
          ? product.customerSalePrice
          : product.price,
      },
    }));

    const response = await axios({
      url: `${PAYPAL_API}/v2/checkout/orders`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            items: line_items,
            amount: {
              currency_code: "AUD",
              value: totalAmount.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "AUD",
                  value: totalAmount.toFixed(2) - shipingFee,
                },
                shipping: {
                  currency_code: "AUD",
                  value: shipingFee,
                },
              },
            },
          },
        ],
        application_context: {
          return_url: process.env.BASE_URL + "/success",
          cancel_url: process.env.BASE_URL + "/cancel",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          brand_name: "RSTS Vintage Shop",
        },
      }),
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "PayPal Payment Error:",
      error.response?.data || error.message
    );
    res.status(500).send("Error creating PayPal order.");
  }
};

export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderID } = req.params;
    const { userId, products, delivery, shipingFee } = req.body;
    const accessToken = await generateAccessToken();

    const totalAmount =
      products.reduce((sum, product) => {
        const price = product.customerSalePrice
          ? product.customerSalePrice
          : product.price;
        return sum + price * product.quantity;
      }, 0) + shipingFee;

    const response = await axios({
      url: `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data.status === 'COMPLETED') {
      const updatedProducts = [];

      for (const item of products) {
        const productInDB = await findOneProductOrderService(item._id);

        if (!productInDB) {
          return res.status(404).json({ message: `Product not found.` });
        }

        if (productInDB.quantity < item.quantity) {
          return res.status(400).json({
            message: `Insufficient stock for ${productInDB.name}. Only ${productInDB.quantity} left. Please check your order.`,
          });
        }
      }

      for (const item of products) {
        const productInDB = await findOneProductOrderService(item._id);

        productInDB.quantity -= item.quantity;
        await productInDB.save();

        const itemTotalPrice = productInDB.price * item.quantity;
        const itemCustomerPrice = productInDB.customerSalePrice * item.quantity;
        const priceDummy = productInDB.customerSalePrice
          ? itemCustomerPrice
          : itemTotalPrice;

        updatedProducts.push({
          product: item._id,
          image: productInDB.images[0],
          name: productInDB.name,
          quantity: item.quantity,
          totalPrice: priceDummy,
        });
      }
       const data = {
          userId: userId,
          products: updatedProducts,
          totalPayment: totalAmount,
          paymentMethod: "Card",
          delivery: delivery,
          shippingFees: shipingFee,
        };

        const findEmail = await findEmailService(data);
        if (!findEmail) {
          return res.status(400).json({
            status: 400,
            message: "Email does not exist.",
          });
        }

        await createOrderService(data);
        io.emit('newOrder',data)
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error capturing PayPal order.");
  }
};
