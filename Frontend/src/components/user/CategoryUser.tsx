import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/Toast";
import type { CategoryProps } from "@/utils/Constant";
import { useUserCategory } from "@/hooks/useUserCategory";
import Loading from "../shared/Loading";

const CategoryUser = () => {

  const navigate = useNavigate()
  const [categoryLists,setCategoryLists] = useState([])
  const {allCategory} = useUserCategory()
  const {data:category,isError,error,isSuccess,isLoading} = allCategory;

  useEffect(()=>{
    if(isSuccess && category){
      setCategoryLists(category)
    }
  },[isSuccess , category])


  if(isError){
    toast(error.message,errorToastStyle)
  }

  const categoryDetail = (id:string) => {
    navigate(`/${id}`)
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <div className="w-full overflow-x-auto md:overflow-x-hidden mt-4">
      <div className="flex gap-6 px-4 py-2 w-max md:w-full md:justify-center overflow-x-auto">
        {categoryLists.length > 0 && categoryLists.map((category:CategoryProps) => (
          <div key={category._id} className="flex flex-col items-center w-[75px] cursor-pointer shrink-0" onClick={()=>categoryDetail(category._id)}>
            <img
              src={category.image}
              alt={`${category.name}_image`}
              className="w-[60px] h-[60px] object-cover rounded-full border-2 border-orange-500"
            />
            <span className="text-sm mt-2 md:ml-0 lg:ml-0 text-center text-nowrap">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryUser;
