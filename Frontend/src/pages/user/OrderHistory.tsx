/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import { useUserMutateOrder } from "@/hooks/useUserOrder"
import { errorToastStyle } from "@/utils/Toast"
import moment from "moment"
import { useEffect, useLayoutEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const OrderHistory = () => {

  const navigate = useNavigate()
  const viewDetails = (id:string) =>{
    navigate(`/orderHistory/${id}`)
  }

  const userId = localStorage.getItem("userId")
  const located  = userId ?? "";

  const {getUserOder} = useUserMutateOrder({id:located})
  const {data:order,isLoading,error,isError,isSuccess} = getUserOder;
  const [orderList,setOrderList] = useState([])
  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])


  useEffect(()=>{
    if(isSuccess && order){
      setOrderList(order)
    }
  },[isSuccess,order])


if(isLoading){
  return <Loading />
}

if(isError){
  toast(error.message , errorToastStyle)
}

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">My Orders History <span className="text-orange-500">({orderList.length})</span></h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl md:h-[calc(100vh-372px) lg:h-[calc(100vh-372px)] h-[440px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border-b text-nowrap">Order ID</th>
              <th className="p-4 border-b">Date</th>
              <th className="p-4 border-b  text-nowrap">Payment Type</th>
              <th className="p-4 border-b ">Items</th>
              <th className="p-4 border-b text-center">Total</th>
              <th className="p-4 border-b text-center">Status</th>
              <th className="p-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {orderList.length > 0 && orderList.map((order:any) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium text-nowrap">{order._id}</td>
                <td className="p-4 border-b text-nowrap">{moment(order.paymentDate).format('lll')}</td>
                <td className="p-4 border-b text-nowrap text-center">{order.paymentMethod ?? '-'}</td>
                <td className="p-4 border-b text-nowrap">
                  <ul className="list-disc pl-4">
                    {order.products.map((item:any) => (
                      <li key={item.product}>
                        {item.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 border-b font-semibold text-right text-nowrap">
                  $ {order.totalPayment.toLocaleString()} AUD
                </td>
                <td className="p-4 border-b text-nowrap text-center">
                  <p className={order.status === 'Delivered'?'text-orange-500':"text-green-500"}>{order.status}</p>
                </td>
                <td className="p-4 border-b">
                  <Button size="sm" variant="outline" onClick={()=>viewDetails(order._id)} className="cursor-pointer">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {orderList.length === 0 && !isLoading && (
          <div className="flex justify-center items-center mt-[150px]">
            <p className="text-xl">No Order History</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
