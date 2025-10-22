import Axios from "@/config/ApiConfig";
import type {
    AdvertisingProps,
  CreateAdvertisingProps,
} from "@/utils/Constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  id: string;
}

const getAdvertising = async () => {
  const res = await Axios.get("advertising");
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const postAdvertising = async (data: CreateAdvertisingProps) => {
  const res = await Axios.post("advertising", data);
  if (res.data.status === 201) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const getAdvertisingId = async (id: string) => {
  const res = await Axios.get(`advertising/${id}`);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const updateMutation = async (data: AdvertisingProps) => {
  const res = await Axios.put(`advertising/${data._id}`, data);
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const deleteMutation = async (id: string) => {
  const res = await Axios.delete(`advertising/${id}`);
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};



export const useAdvertising = () => {
  const queryClient = useQueryClient();

  const queryAdvertising = useQuery({
    queryKey: ["Advertising"],
    queryFn: getAdvertising,
  });



  const createAdvertising = useMutation({
    mutationKey: ["createAdvertising"],
    mutationFn: postAdvertising,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Advertising"] });
    },
  });

  const deleteAdvertising = useMutation({
    mutationKey: ["deleteAdvertising"],
    mutationFn: (id: string) => deleteMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Advertising"] });
    },
  });



  return { queryAdvertising, createAdvertising, deleteAdvertising};
};

export const useMutateAdvertising = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const getAdvertising = useQuery({
    queryKey: ["AdvertisingId", id],
    queryFn: () => getAdvertisingId(id),
    enabled: !!id,
  });

  const updateAdvertising = useMutation({
    mutationKey: ["editAdvertising", id],
    mutationFn: (data: AdvertisingProps) => updateMutation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Advertising"] });
    },
  });



  return { getAdvertising, updateAdvertising };
};
