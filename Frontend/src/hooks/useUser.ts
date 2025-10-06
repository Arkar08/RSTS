import Axios from "@/config/ApiConfig"
import type { postPaginationProps, searchProps } from "@/utils/Constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface Props {
  id: string;
}

interface statusProps {
  id:string,
  isActive:boolean
}

const getAllUser = async() => {
    const res = await Axios.get("users")
    if(res.data.status === 200){
        return res.data.data;
    }else{
        throw new Error(res.data.message)
    }
}

const postPaginationUser = async (data: postPaginationProps) => {
  const res = await Axios.post("users/pagination", data);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const searchUser = async (data:searchProps) => {
  const res = await Axios.post("users/search",data)
  if(res.data.status === 200){
    return res.data.data;
  }else{
    throw new Error(res.data.message);
  }
}

const changeStatus = async (data: statusProps) => {
  const res = await Axios.patch(`users/${data.id}`, data);
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

export const useUser = () =>{
    const queryClient = useQueryClient();
    const queryUser = useQuery({
        queryKey:['Users'],
        queryFn:getAllUser
    })

    const paginationUser = useMutation({
        mutationKey: ["paginationUser"],
        mutationFn: postPaginationUser,
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Users"] });
        },
    });

    const searchingUser = useMutation({
        mutationKey:['searchingUser'],
        mutationFn:searchUser,
        onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:['Users']})
        }
    })

    return {queryUser,paginationUser,searchingUser}
}

export const useMutateUser = ({ id }: Props) => {
  const queryClient = useQueryClient();


  const changeUserStatus = useMutation({
    mutationKey: ["changeIsActive", id],
    mutationFn: (data: statusProps) => changeStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
  });


  return { changeUserStatus};
};