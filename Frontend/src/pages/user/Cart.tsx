import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useUserProduct } from "@/hooks/useUserProduct";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/Toast";
import { Form } from "@/components/ui/form";
import InputFormField from "@/components/shared/InputFormField";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormField from "@/components/shared/SelectFormField";
import { dummyCountry } from "@/utils/Dummy";
import { useOrder } from "@/hooks/useOrder";
import Loading from "@/components/shared/Loading";

const informationSchema = z.object({
  phoneNumber: z.string().min(1, { message: "Phone Number is required." }),
  country: z.string().min(1, { message: "Country is required." }),
});

const Cart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const contextAuth = useContext(AuthContext);

  if (!contextAuth) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }

  const {
    cart,
    clearCart,
    totalAmount,
    totalItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = context;

  const { isAuth } = contextAuth;
  const removeAll = () => {
    clearCart();
  };

  const navigate = useNavigate();
  const { allProduct } = useUserProduct();
  const { data: products, isSuccess } = allProduct;
  const [productList, setProducts] = useState([]);
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const {createOrder} = useOrder()
  const [loading,setLoading] = useState(false)

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (products && isSuccess) {
      setProducts(products.data);
    }
  }, [products, isSuccess]);

  const checkOutClick = () => {
    if (isAuth) {
      const greaterItems = cart.filter((item2) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item1: any = productList.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item._id === item2._id
        );
        return item1 && item2.quantity > item1.quantity;
      });


      if (greaterItems.length > 0) {
        toast(
          `Insufficient stock for ${greaterItems[0].name}. Only ${greaterItems[0].quantity - 1} left. Please check your order. `,
          errorToastStyle
        );
      } else {
        if (cart[0].isShippingRequired === "delivered Product") {
          navigate("/checkout");
        } else {
          setShow(true);
        }
      }
    } else {
      navigate("/auth/login");
    }
  };

  const closeIcon = () => {
    setShow(false)
  }

  const form = useForm<z.infer<typeof informationSchema>>({
    resolver: zodResolver(informationSchema),
    mode: "all",
    defaultValues: {
      phoneNumber: "",
      country: "",
    },
  });

  const { control, handleSubmit,reset } = form;

  const onSubmit = async(values:z.infer<typeof informationSchema >) => {
    setLoading(true)
    const userId = localStorage.getItem("userId")
    const filterAddress = dummyCountry.filter(
      (country) => country._id === values.country
    );
    const data = { ...values,country: filterAddress[0].name };
    const body = {
      delivery:data,
      userId: userId,
      products: cart,
    }
    try {
      const res = await createOrder.mutateAsync(body)
      if(res.status === 201 && res.message === 'Order created successfully.'){
        reset({
          phoneNumber:"",
          country:""
        })
        navigate('/orderSuccess')
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast(`${error.response.data.message}`, errorToastStyle);
    }finally{
      setLoading(false)
    }
  };

  if(loading){
    return <Loading />
  }
  return (
    <div className="p-2 mt-2 bg-gray-100">
      {cart.length !== 0 && (
        <Button
          variant="outline"
          onClick={() => navigate("/collection")}
          className="cursor-pointer bg-black text-white hover:bg-none"
        >
          ← Continue to Shopping
        </Button>
      )}
      <h3 className="text-3xl font-semibold text-orange-600 text-center">
        Cart
      </h3>
      {cart.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-4 py-4">
          <div className="bg-white rounded-md border-b-0 md:col-span-2 lg:col-span-5">
            <div className="bg-gray-200 rounded-md p-3 px-6">
              <h3 className="font-bold">Check your product before checkout</h3>
              <p className="text-sm pt-2">
                Ensure every detail is perfect before completing your purchase.
              </p>
            </div>
            <div className="mt-2 p-3 md:px-6 rounded-lg border-t-2">
              <div className="flex justify-between items-center">
                <p>
                  Cart <span className="text-gray-400">{totalItems} Items</span>
                </p>
                {
                  !show && (
                    <div className="flex gap-2 cursor-pointer" onClick={removeAll}>
                  <Trash2 color="red" />
                  <p className="text-red-600 font-bold">Remove All</p>
                </div>
                  )
                }
              </div>
              <div className="mt-6 space-y-4 py-4">
                {cart.length > 0 &&
                  cart.map((product) => {
                    return (
                      <div
                        className="flex justify-between border p-2 rounded-md"
                        key={product._id}
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            src={product.images[0]}
                            alt="productImage"
                            className="w-[80px] h-[80px] rounded-md"
                          />
                          <div>
                          <h3 className="font-semibold text-sm text-wrap">
                              {product.name}
                            </h3>

                            <p className="mt-4 text-sm">
                              ${" "}
                              {product.customerSalePrice
                                ? product.customerSalePrice
                                : product.price}{" "}
                              AUD
                              <span className="text-gray-400">/item</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-end">
                          <div className="flex gap-2 items-center">
                            {product.quantity === 1 ? (
                              <Button
                                size="icon"
                                className="rounded-full bg-gray-200 hover:bg-gray-200 shadow-md cursor-pointer"
                                onClick={() => removeFromCart(product._id)}
                                disabled={show}
                              >
                                <Trash2 color="red" />
                              </Button>
                            ) : (
                              <Button
                                size="icon"
                                className="rounded-full bg-gray-200 hover:bg-gray-200 shadow-md cursor-pointer"
                                onClick={() => decreaseQuantity(product._id)}
                                disabled={show}
                              >
                                <Minus color="red" />
                              </Button>
                            )}
                            <p className="font-bold">{product.quantity}</p>
                            <Button
                              size="icon"
                              className="rounded-full bg-gray-200 hover:bg-gray-200 shadow-md cursor-pointer"
                              onClick={() => increaseQuantity(product._id)}
                              disabled={show}
                            >
                              <Plus color="green" />
                            </Button>
                          </div>
                          {product.customerSalePrice ? (
                            <h3 className="font-bold mt-4 text-nowrap">
                              $ {product.customerSalePrice * product.quantity}{" "}
                              AUD
                            </h3>
                          ) : (
                            <h3 className="font-bold mt-6 text-nowrap">
                              $ {product.price * product.quantity} AUD
                            </h3>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="md:col-span-1 lg:col-span-2 shadow-md md:mt-[80px] max-h-[450px] h-auto lg:mt-[80px] p-4 rounded-md">
            {show ? (
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Customer Information</h3>
                    <div  onClick={closeIcon} className="shadow-md p-2 rounded-md w-[40px] h-[40px] flex justify-center items-center cursor-pointer">
                      <p className="text-gray-600 text-xl text-center">x</p>
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="mt-2">
                      <SelectFormField
                        control={control}
                        name="country"
                        label="Country"
                        placeholder="Select Country"
                        categoryList={dummyCountry}
                      />
                      <div className="mt-2">
                        <InputFormField
                          placeholder={"Enter Phone Number"}
                          type={"number"}
                          control={control}
                          name={"phoneNumber"}
                          label={"Phone Number"}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center pb-1 h-[40px] mt-2 px-2">
                      <h3 className="font-semibold ">Subtotal</h3>
                      <h3 className="font-bold ">$ {totalAmount} AUD</h3>
                    </div>
                    <div className="flex justify-between items-center mt-4 border-t-2 px-2">
                      <h3 className=" font-semibold">Total</h3>
                      <h3 className="font-bold ">$ {totalAmount} AUD</h3>
                    </div>
                    <div className="mt-4">
                      <Button className="bg-green-600 hover:bg-green-500 cursor-pointer w-full h-[40px]">
                        Place Order
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="lg:mt-[100px] px-3">
                <div className="flex justify-between items-center pb-1 h-[40px]">
                  <h3 className="font-semibold ">Subtotal</h3>
                  <h3 className="font-bold ">$ {totalAmount} AUD</h3>
                </div>
                <div className="flex justify-between items-center pb-1 h-[40px]">
                  <h3 className="font-semibold ">Shipping Fees</h3>
                  <h3 className="font-bold ">$ 0 AUD</h3>
                </div>
                <div className="flex justify-between items-center mt-4 border-t-2">
                  <h3 className=" font-semibold">Total</h3>
                  <h3 className="font-bold ">$ {totalAmount} AUD</h3>
                </div>
                <div className="mt-8">
                  <Button
                    className="w-full h-[50px] cursor-pointer"
                    onClick={checkOutClick}
                  >
                    Processed To Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <div className="flex justify-center items-center h-[calc(100vh-328px)] flex-col">
          <h3 className="text-3xl text-center space-x-1.5">No Cart Found.</h3>
          <Button
            variant="outline"
            onClick={() => navigate("/collection")}
            className="cursor-pointer bg-black text-white hover:bg-none mt-4 h-[50px] w-[200px]"
          >
            Continue To Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
