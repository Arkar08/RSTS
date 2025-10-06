import CategoryBody from "@/components/admin/CategoryBody";
import CreateCategory from "@/components/admin/CreateCategory";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import PagePagination from "@/components/shared/PagePagination";
import TableHeading from "@/components/shared/TableHeading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table } from "@/components/ui/table";
import { useCategory } from "@/hooks/useCategory";
import { categoryHeader } from "@/utils/Dummy";
import { errorToastStyle } from "@/utils/Toast";
import { useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchCategoryData,setSearchCategoryData] = useState('')
  const { queryCategory, paginationCategory, searchingCategory } = useCategory();
  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
    error,
  } = queryCategory;

  const Create = () => {
    setSearchCategoryData("")
    setOpen(true);
  };

  useEffect(() => {
    if (isSuccess && category) {
      setCategoryList(category.data);
      setCurrentPage(category.currentPage);
      setTotalItems(category.totalItems);
      setTotalPage(category.totalPages);
    }
  }, [isSuccess, category]);

  if (isError) {
    toast(error.message, errorToastStyle);
  }

  const handleNextPageClick = async () => {
    setSearchCategoryData("")
    let nextPage;

    if (currentPage < totalPage) {
      nextPage = currentPage + 1;
    } else {
      return;
    }

    const data = {
      page: nextPage,
    };

    try {
      const res = await paginationCategory.mutateAsync(data);
      if (res) {
        setCategoryList(res.data);
        setCurrentPage(res.currentPage);
        setTotalItems(res.totalItems);
        setTotalPage(res.totalPages);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.message, errorToastStyle);
    }
  };

  const handlePrevPageClick = async () => {
    setSearchCategoryData("")
    let prevPage;

    if (currentPage === 1) {
      return;
    } else {
      prevPage = currentPage - 1;
    }

    const data = {
      page: prevPage,
    };
    try {
      const res = await paginationCategory.mutateAsync(data);
      if (res) {
        setCategoryList(res.data);
        setCurrentPage(res.currentPage);
        setTotalItems(res.totalItems);
        setTotalPage(res.totalPages);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.message, errorToastStyle);
    }
  };

  const searchInput = async(event:ChangeEvent<HTMLInputElement>)=>{
    const searchData = event.target.value;
    setSearchCategoryData(searchData)
    try {
      if(searchData !== ''){
        const data = {
          search:searchData
        }
        const res = await searchingCategory.mutateAsync(data)
        if (res) {
          setCategoryList(res);
        }
      }else{
        setCategoryList(category.data);
        setCurrentPage(category.currentPage);
        setTotalItems(category.totalItems);
        setTotalPage(category.totalPages);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast(error.message, errorToastStyle);
    }
  }

  return (
    <div>
      <Header title={"Category"} plusClick={Create} searchInput={searchInput} value={searchCategoryData}/>
      <div className="mt-2 h-[calc(100vh-240px)] overflow-auto border shadow-md rounded">
        <Table className="table-auto w-full">
          <TableHeading headers={categoryHeader} />
          {categoryList &&
            categoryList.map((category, index) => {
              return <CategoryBody category={category} key={index} setSearchCategoryData={setSearchCategoryData}/>;
            })}
        </Table>
        {(isLoading && !isError) && <Loading />}
        {categoryList.length === 0 && !isLoading && (
          <div className="flex justify-center items-center mt-[150px]">
            <p className="text-xl">No Category found.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center mt-2 h-[60px] px-6 shadow-md border rounded">
        <div>
          <p>
            Total Listings - <span className="font-semibold">{totalItems}</span>{" "}
          </p>
        </div>
        <PagePagination
          currentPage={currentPage}
          handleNextPageClick={handleNextPageClick}
          handlePrevPageClick={handlePrevPageClick}
        />
      </div>
      <Dialog open={open}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>
              <p className="text-center text-2xl">Create Category</p>
              <DialogDescription className="text-center mt-2">
                Create Your Category And Choose Your Image.
              </DialogDescription>
            </DialogTitle>
            <CreateCategory setOpen={setOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Category;
