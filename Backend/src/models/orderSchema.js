import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        image:{
          type:String,
          required:true
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [0, "Quantity cannot be negative."],
        },
        totalPrice: {
          type: Number,
          required: true,
          min: [0, "Total Price cannot be negative."],
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["Card", "Paypal"],
    },
    totalPayment: {
      type: Number,
      required: true,
      min: [0, "Total Payment cannot be negative."],
    },
    shippingFees:{
      type:Number
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    status:{
      type:String,
      enum:['PickUp','Delivered'],
      default:'Delivered'
    },
    delivery: {
      name: {
        type: String
      },
      company: {
        type: String,
      },
      country: {
        type: String
      },
      address: {
        type: String
      },
      address2: {
        type: String,
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      postCode: {
        type: String
      },
      phoneNumber: {
        type: String
      },
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;

// example data
// {
//   "email": "64fa4e3a8f2c1b0a7d1f9f33",
//   "products": [
//     {
//       "product"::"64fa4e3a8f2c1b0a7d1f9f33"
//       "name": "USB-C Charger",
//       "quantity": 1,
//       "totalPrice": 19.99,
//       "_id":"64fa4e3a8f2c1b0a7d1f9f33"
//     },
//     {
//      "product"::"64fa4e3a8f2c1b0a7d1f9f33",
//       "name": "Bluetooth Speaker",
//       "quantity": 2,
//       "totalPrice": 89.98,
//       "_id":"64fa4e3a8f2c1b0a7d1f9f33"
//     }
//   ],
//   "paymentMethod": "Card",
//   "totalPayment": 109.97,
//   "delivery": {
//     "name": "John Smith",
//     "company": "Acme Inc.",
//     "country": "United Kingdom",
//     "address": "42 Baker Street",
//     "appartment": "Flat 3B",
//     "city": "London",
//     "state": "Greater London",
//     "postCode": "NW1 6XE",
//     "phoneNumber": "+44-20-7946-0958"
//   }
// }
