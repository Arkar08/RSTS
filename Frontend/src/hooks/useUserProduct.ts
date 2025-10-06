import Axios from "@/config/ApiConfig";
import { useQuery } from "@tanstack/react-query";

const getAllProductListing = async()=>{
  const res = await Axios.get("products/allproducts/getAllProducts");
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
}

export const useUserProduct = () => {
    
  const allProduct = useQuery({
    queryKey:['allProducts'],
    queryFn:getAllProductListing
  })
    return {allProduct}
}