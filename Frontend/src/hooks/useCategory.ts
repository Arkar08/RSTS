import Axios from "@/config/ApiConfig";
import type {
  CategoryProps,
  CreateCategoryProps,
  postPaginationProps,
  searchProps,
} from "@/utils/Constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  id: string;
}

const getCategory = async () => {
  const res = await Axios.get("category");
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const postCategory = async (data: CreateCategoryProps) => {
  const res = await Axios.post("category", data);
  if (res.data.status === 201) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const getCategoryId = async (id: string) => {
  const res = await Axios.get(`category/${id}`);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const updateMutation = async (data: CategoryProps) => {
  const res = await Axios.put(`category/${data._id}`, data);
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const deleteMutation = async (id: string) => {
  const res = await Axios.delete(`category/${id}`);
  if (res.data.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
};

const postPaginationCategory = async (data: postPaginationProps) => {
  const res = await Axios.post("category/pagination", data);
  if (res.data.status === 200) {
    return res.data.data;
  } else {
    throw new Error(res.data.message);
  }
};

const searchCategory = async (data:searchProps) => {
  const res = await Axios.post("category/search",data)
  if(res.data.status === 200){
    return res.data.data;
  }else{
    throw new Error(res.data.message);
  }
}

const getDropdwonList = async() => {
  const res = await Axios.get("category/dropdown")
  if(res.data.status === 200){
    return res.data.data;
  }else{
    throw new Error(res.data.message)
  }
}


export const useCategory = () => {
  const queryClient = useQueryClient();

  const queryCategory = useQuery({
    queryKey: ["Category"],
    queryFn: getCategory,
  });



  const createCategory = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: postCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Category"] });
    },
  });

  const deleteCategory = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => deleteMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Category"] });
    },
  });

  const paginationCategory = useMutation({
    mutationKey: ["paginationCategory"],
    mutationFn: postPaginationCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Category"] });
    },
  });

  const searchingCategory = useMutation({
    mutationKey:['searchingCategory'],
    mutationFn:searchCategory,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['Category']})
    }
  })

  const dropdownCategory = useQuery({
    queryKey:['DropdownCategory'],
    queryFn:getDropdwonList
  })

  return { queryCategory, createCategory, deleteCategory, paginationCategory ,searchingCategory ,dropdownCategory};
};

export const useMutateCategory = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const getCategory = useQuery({
    queryKey: ["CategoryId", id],
    queryFn: () => getCategoryId(id),
    enabled: !!id,
  });

  const updateCategory = useMutation({
    mutationKey: ["editCategory", id],
    mutationFn: (data: CategoryProps) => updateMutation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Category"] });
    },
  });



  return { getCategory, updateCategory };
};
