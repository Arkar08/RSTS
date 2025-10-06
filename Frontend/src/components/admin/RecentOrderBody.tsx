import { TableBody, TableCell, TableRow } from "../ui/table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RecentOrderBody = ({ order }:any) => {
  return (
    <TableBody className="h-[60px]">
      <TableRow>
        <TableCell>
          <p>{order.email}</p>
        </TableCell>
        <TableCell className="text-center">
          <p>{order.products.length}</p>
        </TableCell>
        <TableCell className="text-center">
          <p className="text-right font-semibold">$ {order.totalPayment} AUD</p>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default RecentOrderBody;
