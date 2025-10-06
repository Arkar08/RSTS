import type { OrderProduct } from "@/utils/Constant";
import { TableBody, TableCell, TableRow } from "../ui/table";

interface Order {
    order:OrderProduct
}

const OrderHistoryBody = ({order}:Order) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <div className="w-[40px] h-[40px]  rounded-md shadow-lg mx-auto">
            <img
              src={order.image}
              alt="user.profile"
              className="w-full h-full rounded-md shadow-lg object-cover"
            />
          </div>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}}>{order.name}</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}}>{order.quantity}</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}}>{order.totalPrice}</p>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default OrderHistoryBody
