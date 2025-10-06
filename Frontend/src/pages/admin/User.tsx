import UserBody from "@/components/admin/UserBody";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import PagePagination from "@/components/shared/PagePagination";
import TableHeading from "@/components/shared/TableHeading";
import { Table } from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";
import { userHeader } from "@/utils/Dummy";
import { errorToastStyle } from "@/utils/Toast";
import { useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchUserData,setSearchUserData] = useState('')
  const { queryUser, paginationUser,searchingUser } = useUser();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = queryUser;


  useEffect(() => {
    if (isSuccess && user) {
      setUserList(user.data);
      setCurrentPage(user.currentPage);
      setTotalItems(user.totalItems);
      setTotalPage(user.totalPages);
    }
  }, [isSuccess, user]);

  if (isError) {
    toast(error.message, errorToastStyle);
  }

  const handleNextPageClick = async () => {
    setSearchUserData("")
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
      const res = await paginationUser.mutateAsync(data);
      if (res) {
        setUserList(res.data);
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
    setSearchUserData("")
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
      const res = await paginationUser.mutateAsync(data);
      if (res) {
        setUserList(res.data);
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
    setSearchUserData(searchData)
    try {
      if(searchData !== ''){
        const data = {
          search:searchData
        }
        const res = await searchingUser.mutateAsync(data)
        if (res) {
          setUserList(res);
        }
      }else{
        setUserList(user.data);
        setCurrentPage(user.currentPage);
        setTotalItems(user.totalItems);
        setTotalPage(user.totalPages);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast(error.message, errorToastStyle);
    }
  }

  return (
    <div>
      <Header title={"User Listings"} searchInput={searchInput} value={searchUserData}/>
      <div className="mt-2 h-[calc(100vh-240px)] overflow-auto border shadow-md rounded">
        <Table className="table-auto w-full">
          <TableHeading headers={userHeader} />
          {userList &&
            userList.map((user, index) => {
              return <UserBody user={user} key={index}/>;
            })}
        </Table>
        {(isLoading && !isError) && <Loading />}
        {userList.length === 0 && !isLoading && (
          <div className="flex justify-center items-center mt-[150px]">
            <p className="text-xl">No User found.</p>
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
    </div>
  );
};

export default User;
