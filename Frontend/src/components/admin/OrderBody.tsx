import { View } from "lucide-react";
import { Button } from "../ui/button";
import { TableBody, TableCell, TableRow } from "../ui/table";
import type { OrderProps } from "@/utils/Constant";
import { useNavigate } from "react-router-dom";
import moment from 'moment'

interface Order{
  order:OrderProps
}

const OrderBody = ({order}:Order) => {

  const navigate = useNavigate()

  const ViewOrder = (id:string) =>{
    navigate(`/admin/orders/${id}`)
  }

  return (
    <TableBody>
      <TableRow>
        <TableCell className="text-center">
            <p style={{fontSize:16}}>{order.email}</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}}>{order.products.length}</p>
        </TableCell>
        <TableCell className="text-right">
            <p className="font-semibold" style={{fontSize:16}}>$ {order.totalPayment} AUD</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}}>{order.status === 'Delivered' ? order.paymentMethod: '-'}</p>
        </TableCell>
        <TableCell className="text-center">
            <p className="font-semibold" style={{fontSize:16}}>
                {order?.delivery?.phoneNumber}
            </p>
        </TableCell>
        <TableCell className="text-center">
            <p className="font-semibold capitalize" style={{fontSize:16}}>
                {order?.delivery?.country}
            </p>
        </TableCell>
         <TableCell className="text-center">
            <p className="font-semibold" style={{fontSize:16}}>
                {moment(order.paymentDate).format('lll')}
            </p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}} className={order.status === 'Delivered' ? 'text-orange-500':'text-green-500'}>{order.status}</p>
        </TableCell>
        <TableCell className="flex gap-2 justify-center">
          <Button size="icon" className="size-8 bg-blue-600 cursor-pointer hover:bg-blue-500" onClick={()=>ViewOrder(order._id)}>
            <View />
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default OrderBody
