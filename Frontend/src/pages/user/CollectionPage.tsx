import Loading from "@/components/shared/Loading";
import ProductListings from "@/components/user/ProductListings";
import { useProduct } from "@/hooks/useProduct";
import { useUserProduct } from "@/hooks/useUserProduct";
import { errorToastStyle } from "@/utils/Toast";
import { Search } from "lucide-react";
import { useEffect, useLayoutEffect, useState, type ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const CollectionPage = () => {

  const {allProduct} = useUserProduct(); 
  const {searchingProduct} = useProduct()
  const {data:products,isSuccess,isError,error,isLoading} = allProduct;
  const [produtListing,setProductListing] = useState([])
  const [searchData,setSearchData] = useState("")
  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  useEffect(()=>{
    if(isSuccess && products){
      setProductListing(products.data)
    }
  },[isSuccess , products])

  if(isLoading){
    return <Loading />
  }

  if(isError){
    toast(error.message,errorToastStyle)
  }

  const searchInput = async(event:ChangeEvent<HTMLInputElement>)=>{
        const searchData = event.target.value;
        setSearchData(searchData)
        try {
          if(searchData !== ''){
            const data = {
              search:searchData
            }
            const res = await searchingProduct.mutateAsync(data)
            if (res) {
              setProductListing(res);
            }
          }else{
            setProductListing(products.data);
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          toast(error.message, errorToastStyle);
        }
      }

  return (
    <div className="px-4 mt-2">
      <div className="flex justify-between items-center h-[80px] flex-col md:flex-row sm:flex-col">
        <h3 className="text-2xl font-bold text-orange-600 text-center">All Product Listings ({produtListing.length})</h3>
        <div className="w-[380px] relative">
          <Search className="absolute top-4 left-3"/>
          <input type="text" placeholder="Search product" value={searchData} className="bg-gray-200 rounded-md w-full p-2 px-10 mt-2 outline-0" onChange={(event)=>searchInput(event)}/>
        </div>
      </div>
       <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mt-4 py-4">
            {produtListing.length> 0 && produtListing.map((product, index) => (
              <ProductListings key={index} product={product}/>
            ))}
        </div>
        {
          produtListing.length === 0  && (
            <div className="h-[313px] mt-4">
              <p className="text-center text-3xl font-bold">No Product Found.</p>
            </div>
          )
        }
    </div>
  )
}

export default CollectionPage;
