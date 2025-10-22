import type { AdvertisingProps, MenuItemProps } from "./Constant";

export const menuItems: MenuItemProps[] = [
  {
    route: "/admin/dashboard",
    text: "Dashboard",
    image: "/dashboard-e-commerce.png",
  },
  {
    route:"/admin/user",
    text:"User Listings",
    image:"/user (2).png"
  },
  {
    route:'/admin/advertising',
    text:"Advertising",
    image:"/digital-ads-icon.png"
  },
  {
    route: "/admin/category",
    text: "Category",
    image: "/category-e-commerce.png",
  },
  {
    route: "/admin/products",
    text: "Products",
    image: "/product-e-commerce.png",
  },
  {
    route: "/admin/orders",
    text: "Orders",
    image: "/order-e-commerce.png",
  },
  {
    route: "/admin/auth/logout",
    text: "Logout",
    image: "/logout-e-commerce.png",
  },
];

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/collection", label: "Collection" },
  { path: "/contact", label: "Contact Us" },
  {
    path: "/cart",
    image: "/shopping-cart.png",
    label: "Shopping-Cart",
  }
];

// export const listItems = [
//   { path: "/", label: "Home" },
//   { path: "/collection", label: "Collection" },
//   { path: "/contact", label: "Contact Us" },
//   {
//     path: "/cart",
//     image: "/shopping-cart.png",
//     label: "Shopping-Cart",
//   }
// ];

export const categoryHeader: string[] = ["Image", "Name", "Action"];

export const advertisingHeader:string[] = ['Id','Title','Action'];

export const userHeader:string[] = ["Name","Email","Phone Number","Role","Is Active"]

export const productHeader: string[] = [
  "Image",
  "Name",
  "Category",
  "Quantity",
  "Main Price",
  "Discount Price",
  "Product Features",
  "Is Shipped Required",
  "Action",
];

export const orderHeader: string[] = [
  "Email",
  "Products",
  "Total Payment",
  "Payment Method",
  "Phone Number",
  "Country",
  "Payment Date",
  "Status",
  "Action",
];

export const orderHistoryHeader: string[] = [
  "Image",
  "Product Name",
  "Quantity",
  "Price",
];

export const recentOrderHeader: string[] = [
  "Email",
  "Products",
  "Total Payment",
];

export const service = [
  {
    image:"order (3).png",
    header:"Easy To Order",
    text:"You only need a few steps to order your food."
  },
    {
    image:"fast-delivery.png",
    header:"Fastest Delivery",
    text:"Our delivery is always on time,even faster."
  },
    {
    image:"premium-quality.png",
    header:"Affordable Price",
    text:"One of best price vintage item from Australia."
  }
]

export const categoryBody = [
  {
    _id: "1",
    image: "https://github.com/shadcn.png",
    name: "Watches",
  },
  {
    _id: "2",
    image: "https://github.com/shadcn.png",
    name: "Rings",
  },
  {
    _id: "3",
    image: "https://github.com/shadcn.png",
    name: "Watches",
  },
  {
    _id: "4",
    image: "https://github.com/shadcn.png",
    name: "Rings",
  },
  {
    _id: "5",
    image: "https://github.com/shadcn.png",
    name: "Watches",
  },
  {
    _id: "6",
    image: "https://github.com/shadcn.png",
    name: "Rings",
  },
  {
    _id: "7",
    image: "https://github.com/shadcn.png",
    name: "Watches",
  },
  {
    _id: "8",
    image: "https://github.com/shadcn.png",
    name: "Rings",
  },
  {
    _id: "9",
    image: "https://github.com/shadcn.png",
    name: "Watches",
  },
  {
    _id: "10",
    image: "https://github.com/shadcn.png",
    name: "Rings",
  },
  {
    _id: "11",
    image: "https://github.com/shadcn.png",
    name: "Watches",
  },
  {
    _id: "12",
    image: "https://github.com/shadcn.png",
    name: "Rings",
  },
];

export const advertisingListing:AdvertisingProps[] = [
  {
    _id:'1',
    title:"title"
  }
]

// export const productBody:ProductProps[] = [
//     {
//         _id:"1",
//         image:"https://github.com/shadcn.png",
//         name:"R21",
//         category:"Rings",
//         quantity:100,
//         price:1000,
//         productFeature:"hello world"
//     },
//      {
//         _id:"2",
//         image:"https://github.com/shadcn.png",
//         name:"R21",
//         category:"Rings",
//         quantity:100,
//         price:1000,
//         productFeature:"hello world"
//     },
//      {
//         _id:"3",
//         image:"https://github.com/shadcn.png",
//         name:"R21",
//         category:"Rings",
//         quantity:100,
//         price:1000,
//         productFeature:"hello world"
//     },
//      {
//         _id:"4",
//         image:"https://github.com/shadcn.png",
//         name:"R21",
//         category:"Rings",
//         quantity:100,
//         price:1000,
//         productFeature:"hello world"
//     },
//      {
//         _id:"5",
//         image:"https://github.com/shadcn.png",
//         name:"R21",
//         category:"Rings",
//         quantity:100,
//         price:1000,
//         productFeature:"hello world"
//     },
//      {
//         _id:"6",
//         image:"https://github.com/shadcn.png",
//         name:"R21",
//         category:"Rings",
//         quantity:100,
//         price:1000,
//         productFeature:"hello world"
//     }
// ]

// export const orderBody:OrderProps[] = [
//     {
//         _id:"1",
//         email:"arkar12345@gmail.com",
//         products:[
//             {
//                 _id:"1",
//                 name:"R21",
//                 quantity:4,
//                 totalPrice:4000
//             }
//         ],
//         paymentMethod:"Card",
//         totalPayment:100000,
//         phoneNumber:"+666114555",
//         paymentDate:"25-01-2025",
//         country:"Austraila"
//     },
//     {
//         _id:"2",
//         email:"arkar12345@gmail.com",
//         products:[
//             {
//                 _id:"1",
//                 name:"R21",
//                 quantity:4,
//                 totalPrice:4000
//             }
//         ],
//         paymentMethod:"Card",
//         totalPayment:100000,
//         phoneNumber:"+666114555",
//         paymentDate:"25-01-2025",
//         country:"Austraila"
//     }
// ]

// export const orderHistory:OrderHistoryProps[] = [
//     {
//         _id:"1",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     },
//      {
//         _id:"2",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     },
//      {
//         _id:"3",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     },
//      {
//         _id:"4",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     },
//     {
//         _id:"5",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     },
//      {
//         _id:"6",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     },
//      {
//         _id:"7",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     },
//      {
//         _id:"8",
//         image:"https://github.com/shadcn.png",
//         name:"Rings",
//         quantity:3,
//         price:10000
//     }
// ]

export const dummyCountry = [
  {
    _id:"1",
    name:"United Kingdom"
  },
  {
    _id:"2",
    name:"Australia"
  },
  {
    _id:"3",
    name:"Canada"
  },
  {
    _id:"4",
    name:"New Zealand"
  }
]