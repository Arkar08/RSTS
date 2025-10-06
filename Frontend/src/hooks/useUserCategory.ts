import Axios from "@/config/ApiConfig";
import { useQuery } from "@tanstack/react-query";


interface Props {
  id: string;
}

const getAllCategoryListings = async()=>{
  const res = await Axios.get("category/allcategory/getAllCategory");
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
}


const postCategoryProduct = async(id:string) => {
  const res = await Axios.get(`category/selected/${id}`)
    if(res.data.status === 200){
    return res.data.data;
  }else{
    throw new Error(res.data.message)
  }
}


export const useUserCategory = () => {
    const allCategory = useQuery({
      queryKey:['allCategory'],
      queryFn:getAllCategoryListings
    })
    return {allCategory}
}

export const useUserMutateCategory = ({ id }: Props) => {
    const postProductList = useQuery({
        queryKey:['postCategoryProduct',id],
        queryFn:() => postCategoryProduct(id),
        enabled: !!id,
    })
    return {postProductList}
}