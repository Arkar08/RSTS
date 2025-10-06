import Axios from "@/config/ApiConfig";
import type {
  CreateProductProps,
  postPaginationProps,
  ProductProps,
  searchProps,
} from "@/utils/Constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  id: string;
}

const getAllProducts = async () => {
  const res = await Axios.get("products");
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const postProduct = async (data: CreateProductProps) => {
  const res = await Axios.post("products", data);
  if (res.data.status === 201) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const getProductId = async (id: string) => {
  const res = await Axios.get(`products/${id}`);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const editProduct = async (data: ProductProps) => {
  const res = await Axios.put(`products/${data._id}`, data);
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const deleteMutationProduct = async (id: string) => {
  const res = await Axios.delete(`products/${id}`);
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const postPaginationProduct = async (data: postPaginationProps) => {
  const res = await Axios.post("products/pagination", data);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const searchProduct = async (data:searchProps) => {
  const res = await Axios.post("products/search",data)
  if(res.data.status === 200){
    return res.data.data;
  }else{
    throw new Error(res.data.message);
  }
}



export const useProduct = () => {
  const queryClient = useQueryClient();

  const queryProduct = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
  });


  const createProduct = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationKey: ["productDelete"],
    mutationFn: (id: string) => deleteMutationProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
  });

  const paginationProduct = useMutation({
    mutationKey: ["paginationProducts"],
    mutationFn: postPaginationProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
  });

  const searchingProduct = useMutation({
    mutationKey:['searchProducts'],
    mutationFn:searchProduct,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['Products']})
    }
  })

  return { queryProduct, createProduct, deleteProduct, paginationProduct,searchingProduct };
};

export const useMutateProduct = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const getProduct = useQuery({
    queryKey: ["productId", id],
    queryFn: () => getProductId(id),
    enabled: !!id,
  });

  const updateProduct = useMutation({
    mutationKey: ["editProduct", id],
    mutationFn: (data: ProductProps) => editProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
  });

  return { getProduct, updateProduct };
};
