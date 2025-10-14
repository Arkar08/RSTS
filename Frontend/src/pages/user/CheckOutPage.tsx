/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useLayoutEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormField from "@/components/shared/SelectFormField";
import { dummyCountry } from "@/utils/Dummy";
import { Form } from "@/components/ui/form";
import InputFormField from "@/components/shared/InputFormField";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import {
  PayPalScriptProvider,
  PayPalButtons,
  // PayPalCardFieldsProvider,
} from "@paypal/react-paypal-js";
// import PaypalFormField from "../payment/PaypalFormField";
// import Loading from "@/components/shared/Loading";
import Axios from "@/config/ApiConfig";
import Loading from "@/components/shared/Loading";

const deliverySchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  companyName: z.string(),
  phoneNumber: z.string().min(1, { message: "Phone Number is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  postCode: z.string().min(1, { message: "Post Code is required." }),
  country: z.string(),
});

interface countryProps {
  _id: string;
  name: string;
}

const CheckOutPage = () => {
  const form = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    mode: "all",
    defaultValues: {
      name: "",
      companyName: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      postCode: "",
      country: "2",
    },
  });

  const { control, handleSubmit } = form;
  const [shippingAddress, setShippingAddress] = useState<countryProps>({
    _id: "2",
    name: "Australia",
  });

  const [loading,setLoading] = useState(false)
  const [disableBtn, setDiableBtn] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [adddress2, setAddress2] = useState("");
  const [addressData, setAddressData] = useState<z.infer<
    typeof deliverySchema
  > | null>(null);
  const [shipingFee, setShippingFee] = useState(12);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  const initialOptions = {
    clientId:
      "AeIBNxguJvC5owvHSp-DgRrBpIbyBZhaYITdMzGALM0fw0ZeU7IZkxpgaTutcXAANtKxpLovEmmBd9jd",
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "AUD",
    "data-page-type": "product-details",
    components: "buttons,card-fields",
    "data-sdk-integration-source": "developer-studio",
  };

  const submit = async (values: z.infer<typeof deliverySchema>) => {
    const filterAddress = dummyCountry.filter(
      (country) => country._id === values.country
    );
    const data = { ...values, adddress2: adddress2,country: filterAddress[0].name };
    setShippingAddress(filterAddress[0]);
    // localStorage.setItem("delivery",JSON.stringify(data))
    setAddressData(data);
    setDiableBtn(false);
    setIsEditing(false);
    if (filterAddress[0]._id === "2") {
      setShippingFee(12);
    } else {
      setShippingFee(45);
    }
  };

  const addressChange = (event: any) => {
    setAddress2(event.target.value);
  };

  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart, totalAmount } = context;
  // const [show,setShow] = useState(false)
  


  const createOrder = async () => {
    try {
      const body = {
        products: cart,
        shipingFee: shipingFee,
      };
      const response = await Axios.post(
        "orders",
        body
      );

      const orderData = response.data;
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      // setMessage(
      //   `Could not initiate PayPal Checkout...${error}`
      // );
    }
  };

  // const onApprove = async (data: any) => {
  //   setLoading(true)
  //   const address:any = localStorage.getItem("delivery")

  //   try {
      
  //     const body = {
  //       products: cart,
  //       shipingFee: shipingFee,
  //       delivery: JSON.parse(address),
  //       userId: userId,
  //     };

  //     const response = await fetch(
  //       `https://rsts-vintage-shop-backend.onrender.com/api/v1/orders/capture-paypal-order/${data.orderID}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(body),
  //       }
  //     );
  //     const orderData = await response.json();

  //     // console.log(orderData.payment_source?.card)

  //     if (orderData.status === "COMPLETED") {
  //       navigate("/success");
  //     }

  //     const errorDetail = orderData?.details?.[0];

  //    if (errorDetail) {
  //       throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
  //     } else {
  //       // const transaction =
  //       //   orderData.purchase_units[0].payments.captures[0];
  //       // toast(
  //       //   `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
  //       //   successToastStyle
  //       // );
  //       console.log(
  //         "Capture result",
  //         orderData,
  //         JSON.stringify(orderData, null, 2)
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // setMessage(
  //     //   `Sorry, your transaction could not be processed...${error}`
  //     // );
  //   }finally{
  //     setLoading(false)
  //   }
  // };

  const paypalApprove = async (data:any) => {
    setLoading(true)
    try {
      const body = {
        products: cart,
        shipingFee: shipingFee,
        delivery: addressData,
        userId: userId,
      };

      const response = await fetch(
        `https://rstsvintageshop.com.au/api/v1/orders/capture-paypal-order/${data.orderID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const orderData = await response.json();

      // console.log(orderData.payment_source?.card)

      if (orderData.status === "COMPLETED") {
        navigate("/success");
      }

      const errorDetail = orderData?.details?.[0];

     if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // const transaction =
        //   orderData.purchase_units[0].payments.captures[0];
        // toast(
        //   `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
        //   successToastStyle
        // );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      console.error(error);
      // setMessage(
      //   `Sorry, your transaction could not be processed...${error}`
      // );
    }finally{
      setLoading(false)
    }
  }

  // const onError = () => {
  //   console.log("hello");
  // };

  // const debitClick = () => {
  //   setShow(!show)
  // }

  if(loading){
    return <Loading />
  }



  return (
    <div>
      <Button
        variant="outline"
        onClick={() => navigate("/cart")}
        className="cursor-pointer bg-black text-white hover:bg-none m-4"
      >
        ← Continue to Cart
      </Button>
      <h3 className="text-3xl font-semibold text-orange-600 text-center">
        Check-Out
      </h3>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 w-full mt-2 pb-6 md:px-3 px-1">
        <div className="mt-4 p-3 md:px-6 col-span-2 shadow-md">
          <h3 className="text-xl font-bold">Delivery Address</h3>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={handleSubmit(submit)} className="px-2">
                <div className="mt-2">
                  <InputFormField
                    label="Name"
                    placeholder="Enter Name"
                    control={control}
                    name="name"
                  />
                </div>
                <div className="mt-2">
                  <InputFormField
                    label="Company Name (Option)"
                    placeholder="Enter Company Name"
                    control={control}
                    name="companyName"
                  />
                </div>
                <div className="mt-2">
                  <InputFormField
                    label="Phone Number"
                    placeholder="Enter Phone Number"
                    control={control}
                    name="phoneNumber"
                    type={"number"}
                  />
                </div>
                <div className="mt-2">
                  <SelectFormField
                    control={control}
                    name="country"
                    label="Country"
                    placeholder="Select Country"
                    categoryList={dummyCountry}
                  />
                </div>
                <div className="mt-2">
                  <InputFormField
                    label="Address"
                    placeholder="Address1"
                    control={control}
                    name="address"
                  />
                </div>
                <div className="mt-2">
                  <Input
                    placeholder="Address2"
                    value={adddress2}
                    onChange={(event) => addressChange(event)}
                  />
                </div>
                <div className="mt-2">
                  <InputFormField
                    label="State"
                    placeholder="Enter State"
                    control={control}
                    name="state"
                  />
                </div>
                <div className="mt-2">
                  <InputFormField
                    label="City"
                    placeholder="Enter City"
                    control={control}
                    name="city"
                  />
                </div>
                <div className="mt-2">
                  <InputFormField
                    label="Post Code"
                    placeholder="Enter Post Code"
                    control={control}
                    name="postCode"
                    type={"number"}
                  />
                </div>
                <div className="mt-8">
                  <Button className="bg-green-600 hover:bg-green-500 cursor-pointer w-full h-[40px]">
                    Add To Address
                  </Button>
                  {addressData && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-[40px] cursor-pointer"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          ) : (
            <div className="mt-4 space-y-3">
              <p>
                <strong>Name:</strong> {addressData?.name}
              </p>
              <p>
                <strong>Company:</strong> {addressData?.companyName}
              </p>
              <p>
                <strong>Phone:</strong> {addressData?.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {addressData?.address}, {adddress2}
              </p>
              <p>
                <strong>City:</strong> {addressData?.city}
              </p>
              <p>
                <strong>State:</strong> {addressData?.state}
              </p>
              <p>
                <strong>Post Code:</strong> {addressData?.postCode}
              </p>
              <p>
                <strong>Country:</strong> {shippingAddress.name}
              </p>

              <Button
                variant="outline"
                className="w-full h-[40px] cursor-pointer"
                onClick={() => {
                  setIsEditing(true);
                  form.reset(addressData!);
                }}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
        <div>
          <div className="md:col-span-1 lg:col-span-1 mt-3 shadow-md p-2 rounded-md">
            <h3 className="text-xl font-bold">Your Orders ({cart.length})</h3>
            <div className="mt-2 p-3 max-h-[350px] overflow-y-auto">
              {cart.map((product) => {
                return (
                  <div
                    className="flex justify-between items-center mt-3"
                    key={product._id}
                  >
                    <div className="flex gap-2">
                      <img
                        src={product.images[0]}
                        alt="product_image"
                        className="w-[50px] h-[50px] rounded-md"
                      />
                      <div>
                        <h3 className="text-wrap">{product.name}</h3>
                        <p className="text-gray-400">x{product.quantity}</p>
                      </div>
                    </div>
                    <div>
                      ${" "}
                      {product.customerSalePrice
                        ? product.customerSalePrice
                        : product.price}{" "}
                      AUD
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-1 lg:col-span-1 h-auto mt-3 shadow-md p-4 rounded-md">
            <h3 className="text-xl font-bold">Payment Methods</h3>
            <div className="px-3 mt-2">
              <div className="flex justify-between items-center pb-1 h-[40px]">
                <h3 className="font-semibold">Subtotal</h3>
                <h3 className="font-bold">$ {totalAmount} AUD</h3>
              </div>
              <div className="flex justify-between items-center pb-1 h-[40px]">
                <h3 className="font-semibold">Shipping Address</h3>
                <h3 className="font-bold">{shippingAddress.name}</h3>
              </div>
              <div className="flex justify-between items-center pb-1 h-[40px]">
                <h3 className="font-semibold">Shipping Fees</h3>
                <h3 className="font-bold ">$ {shipingFee} AUD</h3>
              </div>
              <div className="flex justify-between items-center mt-4 border-t-2">
                <h3 className=" font-semibold">Total</h3>
                <h3 className="font-bold ">$ {totalAmount + shipingFee} AUD</h3>
              </div>
              <div className="mt-8">
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    style={{
                      shape: "pill",
                      layout: "vertical",
                      color: "gold",
                      label: "paypal",
                    }}
                    createOrder={createOrder}
                    onApprove={(data) => paypalApprove(data)}
                    onCancel={() => {
                      navigate("/cancel");
                    }}
                    disabled={disableBtn}
                  />
                  {/* <h3 className="text-center text-gray-400">OR</h3> */}

                 {/* <Button className="w-full h-[50px] text-xl rounded-full my-2 cursor-pointer" disabled={disableBtn} onClick={debitClick}>Debit or Credit Card</Button>

                  {
                    show && (
                       <PayPalCardFieldsProvider
                    createOrder={createOrder}
                    onApprove={(data)=>onApprove(data)}
                    onError={onError}
                    style={{
                      input: {
                        "font-size": "16px",
                        "font-family": "courier, monospace",
                        "font-weight": "lighter",
                        color: "#ccc",
                      },
                      ".invalid": { color: "purple" },
                    }}
                  >
                    <PaypalFormField totalAmount={totalAmount} shipingFee={shipingFee} disableBtn={disableBtn}/>
                  </PayPalCardFieldsProvider>
                    )
                  }

                 */}
                  
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CheckOutPage;

