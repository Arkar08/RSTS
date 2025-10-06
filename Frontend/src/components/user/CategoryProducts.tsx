import { useLocation, useNavigate, useParams } from "react-router-dom"
import ProductListings from "./ProductListings"
import { useEffect, useLayoutEffect, useState } from "react"
import { toast } from "sonner"
import { errorToastStyle } from "@/utils/Toast"
import { Button } from "../ui/button"
import { useUserMutateCategory } from "@/hooks/useUserCategory"
import Loading from "../shared/Loading"

const CategoryProducts = () => {

    const {category} = useParams()
    const navigate  = useNavigate()
    const located = category ?? ''
    const {postProductList} = useUserMutateCategory({id:located})
    const {data: productCategory,isSuccess,isError,error,isLoading} = postProductList;
    const [categoryList,setCategoryList] = useState([])
    const [categoryName,setCategoryName] = useState("")
    const {pathname} = useLocation()

    useLayoutEffect(()=>{
      window.scrollTo(0,0)
    },[pathname])


    useEffect(()=>{
      if(isSuccess && productCategory){
        setCategoryList(productCategory.data)
        setCategoryName(productCategory.categoryName)
      }
    },[isSuccess,productCategory])

    if(isLoading){
      return <Loading />
    }

    if(isError){
      toast(error.message,errorToastStyle)
    }

  return (
    <div className="w-full py-8 px-4">
      <Button variant="outline" onClick={() => navigate('/')} className="cursor-pointer bg-black text-white hover:bg-none">
        ← Back
      </Button>
      <h3 className='uppercase text-center text-orange-600 font-bold text-xl'>{categoryName}</h3>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center mt-4 py-4">
            {categoryList.length > 0 && categoryList.map((product, index) => (
              <ProductListings key={index} product={product}/>
            ))}
        </div>
        {
          categoryList.length === 0 &&  (
            <div className="h-[273px] mt-4">
                <h3 className="text-center text-3xl">No Product Found.</h3>
            </div>
          )
        }
    </div>
  )
}

export default CategoryProducts
