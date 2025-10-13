import DashboardCard from "@/components/admin/DashboardCard"
import { useCategory } from "@/hooks/useCategory"
import { useOrder } from "@/hooks/useOrder";
import { useProduct } from "@/hooks/useProduct";
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import TableHeading from "@/components/shared/TableHeading";
import { recentOrderHeader } from "@/utils/Dummy";
import RecentOrderBody from "@/components/admin/RecentOrderBody";
import {Chart as ChartJs,ArcElement,Tooltip, type ChartData} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/shared/Loading";

ChartJs.register(ArcElement, Tooltip);




const Dashboard = () => {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const {queryCategory} = useCategory()
  const {data:category} = queryCategory;
  const {queryProduct} = useProduct()
  const {data:products} = queryProduct;
  const {queryOrder} = useOrder()
  const {data:orders,isError,isLoading} = queryOrder;
  const {queryUser} = useUser()
  const {data:users} = queryUser;
  const [dummyData,setDummyData] = useState<ChartData<'pie'>>()

useEffect(() => {
  if (category && products && orders && users) {
    setDummyData({
      labels: ['Users', 'Category', 'Products', 'Order'],
      datasets: [
        {
          label: 'Data',
          data: [users?.totalItems, category?.totalItems, products?.totalItems, orders?.totalItems],
          backgroundColor: ['blue', '#ffa200', '#70e000', '#011627'],
          borderColor:[
            "#00b4d8",
            "#ff8600",
            "#25a18e",
            '#001d3d'
          ],
          hoverOffset: 1,
        },
      ],
    });
  }
}, [category, products, orders, users]);


  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mt-4 h-[80px]">
        <DashboardCard background={"blue"} title={"Users"} length={users?.totalItems ?? 0}/>
        <DashboardCard background={"orange"} title={"Category"} length={category?.totalItems ?? 0}/>
        <DashboardCard background={"green"} title={"Products"} length={products?.totalItems ?? 0}/>
        <DashboardCard background={"black"} title={"Orders"} length={orders?.totalItems ?? 0}/>
      </div>
      <div className="grid grid-cols-4 h-[calc(100vh-280px)] mt-8 gap-6">
        <div className="rounded-md shadow-md p-1">
          <h3 className="text-center text-xl font-semibold">All Data</h3>
          <div className="w-[90%] mx-auto mt-8">
            { dummyData?.datasets?.[0]?.data?.length ? (
                <Pie data={dummyData} />
              ) : (
                <div className="flex justify-center items-center mt-[200px]">
                  <p className="text-xl">No Data found.</p>
                </div>
              )
            }

          </div>
        </div>
        <div className="rounded-md shadow-md w-full p-1">
          <h3 className="text-center text-xl font-semibold">Calendar</h3>
          <Calendar className="w-[100%] mx-auto rounded-lg"  mode="single"
            selected={date}
            onSelect={setDate}/>
        </div>
        <div className="rounded-md shadow-md p-2 col-span-2">
          <h3 className="text-center text-xl font-semibold">Recent Orders</h3>
          <Table className="table-auto w-full mt-4">
          <TableHeading headers={recentOrderHeader}/>
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            orders?.data && orders?.data.slice(0,5).map((order:any,index:any)=>{
              return(
                <RecentOrderBody order={order} key={index}/>
              )
            })
          }
        </Table>
        {(isLoading && !isError) && <Loading />}
        {(orders?.totalItems === 0 || !orders  && !isLoading)  && (
          <div className="flex justify-center items-center mt-[120px]">
            <p className="text-xl">No Order found.</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
