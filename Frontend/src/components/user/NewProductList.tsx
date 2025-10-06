import { useProduct } from "@/hooks/useProduct"
import TrendingCard from "./TrendingCard"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/Toast";

const NewProductList = () => {

  const [productLists,setProductLists] = useState([])
  const {queryProduct} = useProduct()

  const {data:products,isError,error,isSuccess} = queryProduct;

  useEffect(()=>{
    if(isSuccess && products){
      setProductLists(products.data)
    }
  },[isSuccess , products])

  if(isError){
    toast(error.message,errorToastStyle)
  }

  return (
    <div className="w-full py-8">
        <h3 className="text-center text-2xl font-bold">⭐New Arrivals</h3>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mt-4">
            {productLists?.length > 0 && productLists?.slice(0,4).map((product, index) => (
              <TrendingCard key={index} product={product}/>
            ))}
        </div>
    </div>
  )
}

export default NewProductList
