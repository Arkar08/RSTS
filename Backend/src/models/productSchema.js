import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    customerSalePrice:{
      type:Number,
      default:0,
      min: [0, "Sale Price cannot be negative."]
    },
    productFeature: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    isShippingRequired:{
      type:String,
      default:"delivered Product",
      enum:['pickUp Product','delivered Product']
    }
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

export default Products;

//example data
// {
//   "name": "Wireless Earbuds",
//   "category": "64f9e3c3b2d0c1a8a2e7f1d2",
//   "quantity": 50,
//   "price": 79.99,
//   "productFeature": "Bluetooth 5.3, Noise Cancellation, 24-hour Battery Life",
//   "images": [
//     "https://example.com/images/earbuds-front.jpg",
//     "https://example.com/images/earbuds-side.jpg"
//   ]
// }
