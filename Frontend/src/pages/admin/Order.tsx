/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderBody from "@/components/admin/OrderBody";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import PagePagination from "@/components/shared/PagePagination";
import TableHeading from "@/components/shared/TableHeading";
import { Table } from "@/components/ui/table";
import { useOrder } from "@/hooks/useOrder";
import { orderHeader } from "@/utils/Dummy";
import { errorToastStyle } from "@/utils/Toast";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {io} from 'socket.io-client';

const Order = () => {
  const [orderList, setOrderList] = useState<any[]>([]);
  const [orderPage, setOrderPage] = useState(1);
  const [orderTotalPage, setOrderTotalPage] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const { queryOrder, paginationOrder } = useOrder();
  const { data: order, isLoading, isError, error, isSuccess } = queryOrder;
  const socket = io("https://rstsvintageshop.com.au");


  useEffect(() => {
    if (isSuccess && order) {
      setOrderList(order.data);
      setOrderPage(order.currentPage);
      setOrderTotal(order.totalItems);
      setOrderTotalPage(order.totalPages);
    }

    socket.on("newOrder", (order: any) => {
      setOrderList((prev: any) => [order, ...prev]);
      setOrderTotal((prev)=>prev + 1)
    });

    return () => {
      socket.disconnect();
    };

  }, [isSuccess, order,socket]);

  if (isError) {
    toast(error.message, errorToastStyle);
  }

  const handleNextPageClick = async () => {
    let nextPage;

    if (orderPage < orderTotalPage) {
      nextPage = orderPage + 1;
    } else {
      return;
    }

    const data = {
      page: nextPage
    };

    try {
      const res = await paginationOrder.mutateAsync(data);
      if (res) {
        setOrderList(res.data);
        setOrderPage(res.currentPage);
        setOrderTotal(res.totalItems);
        setOrderTotalPage(res.totalPages);
      }
    } catch (error: any) {
      toast(error.message, errorToastStyle);
    }
  };

  const handlePrevPageClick = async () => {
    let prevPage;

    if (orderPage === 1) {
      return;
    } else {
      prevPage = orderPage - 1;
    }

    const data = {
      page: prevPage,
    };
    try {
      const res = await paginationOrder.mutateAsync(data);
      if (res) {
        setOrderList(res.data);
        setOrderPage(res.currentPage);
        setOrderTotal(res.totalItems);
        setOrderTotalPage(res.totalPages);
      }
    } catch (error: any) {
      toast(error.message, errorToastStyle);
    }
  };


  return (
    <div>
      <Header title="Orders" />
      <div className="mt-2 h-[calc(100vh-240px)] overflow-auto shadow-md border rounded">
        <Table>
          <TableHeading headers={orderHeader} />
          {orderList.map((order, index) => {
            return <OrderBody order={order} key={index} />;
          })}
        </Table>
        {(isLoading && !isError) && <Loading />}
        {orderList.length === 0 && !isLoading && (
          <div className="flex justify-center items-center mt-[150px]">
            <p className="text-xl">No Order found.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center mt-2 h-[60px] px-6 shadow-md border rounded">
        <div>
          <p>
            Total Listings - <span className="font-semibold">{orderTotal}</span>{" "}
          </p>
        </div>
        <PagePagination
          currentPage={orderPage}
          handleNextPageClick={handleNextPageClick}
          handlePrevPageClick={handlePrevPageClick}
        />
      </div>
    </div>
  );
};

export default Order;
