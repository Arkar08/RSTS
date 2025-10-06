import Axios from "@/config/ApiConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


interface Props {
  id:string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postOrders = async(data:any) => {
  const res = await Axios.post('orders',data);
  if (res.data.status === 201) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
}

const getUserOrders = async(id:string) => {
  const res = await Axios.get(`orders/selected/${id}`)
  if(res.data.status === 200){
    return res.data.data;
  }else{
    throw new Error(res.data.message)
  }
}


export const useUserOrder = () => {
    const queryClient = useQueryClient();
    const postOrder = useMutation({
        mutationKey:['Create Order'],
        mutationFn:postOrders,
        onSuccess:() => {
          queryClient.invalidateQueries({queryKey:['Orders']})
        }
      })
      return {
        postOrder,
      }
}

export const useUserMutateOrder = ({ id }: Props) => {
    const getUserOder = useQuery({
        queryKey:['Get One User Order',id],
        queryFn:() => getUserOrders(id),
        enabled: !!id,
    })
    return {getUserOder}
}