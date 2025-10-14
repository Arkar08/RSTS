import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/Toast";
import type { CategoryProps } from "@/utils/Constant";
import { useUserCategory } from "@/hooks/useUserCategory";
import Loading from "../shared/Loading";

const CategoryUser = () => {
  const navigate = useNavigate();
  const [categoryLists, setCategoryLists] = useState<CategoryProps[]>([]);
  const { allCategory } = useUserCategory();
  const { data: category, isError, error, isSuccess, isLoading } = allCategory;

  
  useEffect(() => {
    if (isSuccess && category) {
      setCategoryLists(category);
    }
  }, [isSuccess, category]);

  useEffect(() => {
    if (isError && error) {
      toast(error.message || "Something went wrong", errorToastStyle);
    }
  }, [isError, error]);

  const categoryDetail = (id: string) => {
    navigate(`/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoading && categoryLists.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-center">No categories found.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-sm rounded-md py-4 mt-4">

      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-200">
        <div className="flex items-center gap-6 px-6 py-2 h-[120px] min-w-max">
          {categoryLists.map((category: CategoryProps) => (
            <div
              key={category._id}
              className="flex flex-col items-center w-[80px] cursor-pointer shrink-0 group"
              onClick={() => categoryDetail(category._id)}
            >
              <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-orange-500 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={category.image}
                  alt={`${category.name}_image`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm mt-2 text-center text-gray-700 text-nowrap group-hover:text-orange-600 transition-colors duration-200">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryUser;
