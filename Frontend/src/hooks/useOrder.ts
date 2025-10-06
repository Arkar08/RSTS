import Axios from "@/config/ApiConfig";
import type { postPaginationProps } from "@/utils/Constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  id: string;
}

const getAllOrders = async () => {
  const res = await Axios.get("orders");
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const getOneOrder = async (id: string) => {
  const res = await Axios.get(`orders/${id}`);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};



const postPaginationOrder = async (data: postPaginationProps) => {
  const res = await Axios.post("orders/pagination", data);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const placeOrder = async(data:any) => {
  const res = await Axios.post("orders/placeOrder",data)
  if (res.data.status === 201) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
}

export const useOrder = () => {
  const queryClient = useQueryClient();

  const queryOrder = useQuery({
    queryKey: ["Orders"],
    queryFn: getAllOrders,
  });

  const paginationOrder = useMutation({
    mutationKey: ["paginationOrders"],
    mutationFn: postPaginationOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Orders"] });
    },
  });

    const createOrder = useMutation({
      mutationKey: ["createOrder"],
      mutationFn: placeOrder,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Orders"] });
      },
    });

  

  return { queryOrder, paginationOrder,createOrder };
};

export const useMutationOrder = ({ id }: Props) => {
  const getOrder = useQuery({
    queryKey: ["orderId", id],
    queryFn: () => getOneOrder(id),
    enabled: !!id,
  });

  return { getOrder };
};
