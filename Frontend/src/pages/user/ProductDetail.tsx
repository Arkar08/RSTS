import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import ProductListings from "@/components/user/ProductListings"
import { CartContext } from "@/context/CartContext"
import { useMutateProduct } from "@/hooks/useProduct"
import type { ProductProps } from "@/utils/Constant"
import { errorToastStyle, successToastStyle } from "@/utils/Toast"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"



const ProductDetail = () => {

  const {id} = useParams()
  const located = id ?? "";
  const {getProduct} = useMutateProduct({id:located})
  const {data:product,isSuccess,isLoading} = getProduct;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productList,setProductList] = useState<any>(null)
  const [oneImage,setOneImage] = useState('')
  const navigate = useNavigate()
  const [relatedProducts,setRelatedProducts] = useState([])
  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  useEffect(()=>{
    if(isSuccess && product){
      setProductList(product.data)
      setOneImage(product.data.images[0])
      setRelatedProducts(product.relatedProduct)
    }
  },[isSuccess , product])

  const ViewImage = (image:string) => {
    setOneImage(image)
    setTimeout(()=>{
      setOneImage(product.data.images[0])
    },3000)
  }

  const context = useContext(CartContext);
  
    if (!context) {
      throw new Error("CartContext must be used within a CartProvider");
    }

    const {addToCart,cart} = context;

    const addToProduct = (data:ProductProps) => {
        if(cart.length > 0){
            if(cart[0].isShippingRequired === data.isShippingRequired){
              addToCart(data)
              toast('Item added successfully',successToastStyle)
              navigate('/cart')
            }else{
              toast(`The selected item must be a ${cart[0].isShippingRequired} item.`,errorToastStyle)
            }
        }else{
          addToCart(data)
          toast('Item added successfully',successToastStyle)
          navigate('/cart')
        }
    }

    if(isLoading){
      return <Loading />
    }

  return (
    <div className="px-4 mt-4">
      <Button variant="outline" onClick={() => navigate('/collection')} className="cursor-pointer bg-black text-white hover:bg-none">
        ← Back to Products
       </Button>
     {
        productList && (
          <div className="flex gap-4 flex-col md:flex-row sm:flex-row lg:flex-row my-4">
        <img src={oneImage} alt="first-image" className="w-[440px] h-[440px] sm:w-[300px] sm:h-[350px] md:w-[600px] md:h-[590px] object-cover rounded-md"/>
        <div className="flex flex-row md:flex-col sm:flex-col lg:flex-col gap-6 items-center">
          {
            productList.images.slice(1,3).map((image:string)=>{
              return(
                <img src={image} alt="first-image" className="w-[100px] h-[100px] sm:w-[140px] md:w-[180px] md:h-[180px] object-cover rounded-md cursor-pointer" key={image} onClick={()=>ViewImage(image)}/>
              )
            })
          }
        </div>
        <div className="w-[380px] px-2">
            <h3 className="text-xl font-semibold p-2">{productList?.name}</h3>
            <h4 className="p-1 px-2">Category: {productList?.categoryName}</h4>
            <h4 className="p-1 px-2 font-semibold">Stock: <span className="text-green-600" style={{fontSize: "18px",fontWeight: "bold"}}>{productList?.quantity}</span></h4>
            <div className="px-2">
              {
                productList.customerSalePrice > 0 ? (
                  <div>
                    <span style={{ color: "orangered", fontWeight: "bold", fontSize: "18px" }}>
                    $ {productList?.customerSalePrice} AUD
                  </span>{" "}
                  <span style={{ textDecoration: "line-through", color: "gray", fontSize: "16px" }}>
                    $ {productList.price} AUD
                  </span>
                  </div>
                ):(
                  <span style={{fontSize: "18px",fontWeight: "bold" }}>
                    $ {productList.price} AUD
                  </span>
                )
              }
            </div>
            <h3 className="p-2 text-wrap">{productList?.productFeature}</h3>
            <div>
              {
                productList?.isShippingRequired === 'pickUp Product' && (
                  <h3 className="p-2 text-red-600 font-bold">
                    * This item is a Pickup item and will not be shipped to the customer.
                  </h3>
                )
              }
            </div>
            {
              productList?.quantity > 0 ? (
                <div className="w-[92%] mt-7">
                    <Button className="cursor-pointer h-[45px] w-full" onClick={()=>addToProduct(product.data)}>Add To Cart</Button>
                </div>
              ):(
                <div className="mt-4">
                    <p className="text-2xl text-center font-bold">Out Of Stock</p>
                </div>
              )
            }
        </div>
      </div>
        )
      }
      {
        relatedProducts.length > 0 && (
            <div className="py-4">
            <h3 className="font-semibold text-xl">Related Products</h3>
            <div className="flex gap-4 mt-4 overflow-x-auto overflow-y-hidden">
              {relatedProducts.map((product,index) => (
                <div className="min-w-[200px] mx-[25px]" key={index}>
                  <ProductListings product={product}/>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductDetail
