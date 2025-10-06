import { useUserProduct } from "@/hooks/useUserProduct";
import TrendingCard from "./TrendingCard"
import { errorToastStyle } from "@/utils/Toast";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TrendingProducts = () => {


  const {allProduct} = useUserProduct()
  const [productLists,setProductLists] = useState([])
  const {data:products,isError,error,isSuccess} = allProduct;

  useEffect(()=>{
    if(isSuccess && products){
      setProductLists(products.data)
    }
  },[isSuccess,products])

  if(isError){
    toast(error.message,errorToastStyle)
  }

  return (
    <div className="w-full py-8">
        <h3 className="text-center text-2xl font-bold">🔥Trending Products</h3>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mt-4">
            {productLists.length > 0 && productLists.slice(-4).map((product, index) => (
              <TrendingCard key={index} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default TrendingProducts
