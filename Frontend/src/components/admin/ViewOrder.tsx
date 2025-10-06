import { orderHistoryHeader } from "@/utils/Dummy";
import TableHeading from "../shared/TableHeading";
import { Button } from "../ui/button";
import { Table } from "../ui/table";
import OrderHistoryBody from "./OrderHistoryBody";
import { useNavigate, useParams } from "react-router-dom";
import { useMutationOrder } from "@/hooks/useOrder";
import Loading from "../shared/Loading";
import moment from "moment";
import type { OrderProduct } from "@/utils/Constant";
import OrderPdfDocument from "./OrderPdfDocument";
import { pdf } from "@react-pdf/renderer";

const ViewOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const located = id ?? "";
  const { getOrder } = useMutationOrder({ id: located });
  const { data: orders, isLoading } = getOrder;

  if (isLoading) {
    return <Loading />;
  }

  if (!orders) return <div>Order not found</div>;

  const backBtn = () => {
    navigate("/admin/orders");
  };

  const downloadPdf = async () => {
    // Create PDF instance with the document and order data
    const doc = (
      <OrderPdfDocument
        order={{
          ...orders,
          paymentDate: moment(orders.paymentDate).format("lll"), // formatting date for PDF
        }}
      />
    );

    // Generate PDF as blob
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();

    // Trigger file download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Order_${orders._id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-6 h-[calc(100vh-220px)] mt-6">
        <div className="rounded-md shadow-md p-3">
          <h3 className="text-center text-2xl font-bold">Order History</h3>
          <div className="mt-2">
            <h3 className="p-1 font-bold">Order No - {orders?._id}</h3>
            <h3 className="font-bold p-1 mt-4">Customer's Information</h3>
            <div className="pl-4 mt-2 flex justify-between items-center">
              {
                orders.status === 'PickUp' && (
                  <h3>Customer Name - {orders.name}</h3>
                )
              }
              <h3>Email - {orders?.email}</h3>
              {
                orders.status === 'Delivered' && (
                  <h3>Phone Number - {orders?.delivery?.phoneNumber}</h3>
                )
              }
            </div>
            {orders.status === "Delivered" ? (
              <>
                <h3 className="font-bold p-1 mt-4">Payment Information</h3>
                <div className="pl-4 mt-2 flex justify-between items-center">
                  <h3>
                    Payment Date - {moment(orders?.paymentDate).format("lll")}
                  </h3>
                  <div>
                    <h3>Payment Method - {orders?.paymentMethod}</h3>
                    <h3>Payment Status - <span className={orders.status === 'Delivered' ?'text-orange-500':'text-green-500'}>{orders?.status}</span></h3>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold p-1 mt-4">Order Information</h3>
                <div className="pl-4 mt-2 flex justify-between items-center">
                  <h3>
                    Order Date - {moment(orders?.paymentDate).format("lll")}
                  </h3>
                  <h3>Order Status - <span className={orders.status === 'Delivered' ?'text-orange-500':'text-green-500'}>{orders.status}</span></h3>
                </div>
              </>
            )}
          </div>
          {orders.status === "Delivered" ? (
            <>
              <h3 className="font-bold p-1 mt-4">Delivery Address</h3>
              <div className="pl-4 mt-2 flex justify-between items-center">
                <h3>Name - {orders?.delivery?.name}</h3>
                <h3>Country - {orders?.delivery?.country}</h3>
              </div>
              <div className="pl-4 mt-2 flex justify-between items-center">
                <h3>City - {orders?.delivery?.city}</h3>
                <h3>State - {orders?.delivery?.state}</h3>
              </div>
              <div className="pl-4 mt-2 flex justify-between items-center">
                <h3>Address - {orders?.delivery?.address}</h3>
                <h3>PostCode - {orders?.delivery?.postCode}</h3>
              </div>
              <div className="pl-4 mt-2 flex justify-between items-center">
                {
                  orders?.delivery?.address2 ? (
                    <h3>Address2 - {orders?.delivery?.adddress2}</h3>
                  ):(
                    <h3></h3>
                  )
                }
                 {
                  orders?.delivery?.companyName ? (
                    <h3>Company Name - {orders?.delivery?.company}</h3>
                  ):(
                    <h3></h3>
                  )
                }
              </div>
            </>
          ):(
            <div className="pl-4 mt-2 flex justify-between items-center">
                <h3>Country - {orders?.delivery?.country}</h3>
                <h3>Phone Number - {orders?.delivery?.phoneNumber}</h3>
              </div>
          )
        }
        </div>
        <div className="rounded-md shadow-md p-3">
          <div className="h-[calc(100vh-350px)] border rounded-md mt-2 overflow-y-auto">
            <Table>
              <TableHeading headers={orderHistoryHeader} />
              {orders?.products &&
                orders?.products.map((order: OrderProduct) => {
                  return <OrderHistoryBody key={order._id} order={order} />;
                })}
            </Table>
          </div>
          <div className="flex justify-end flex-col items-end mt-4">
           {
            orders.status === 'Delivered' ? (
              <>
                <h3 className="font-bold">
              SubTotal - ${orders.totalPayment - orders?.shippingFees} AUD
            </h3>
               <h3 className="font-bold mt-2">
              Shipping Fees - ${orders?.shippingFees} AUD
            </h3>
              </>
            ):(
               <h3 className="font-bold">
              SubTotal - ${orders?.totalPayment} AUD
            </h3>
            )
           }
            <h3 className="font-bold mt-2">
              Total Payment - ${orders?.totalPayment} AUD
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end items-center gap-4">
        {" "}
        <Button className="w-[120px] cursor-pointer p-2" onClick={backBtn}>
          {" "}
          Back To Order{" "}
        </Button>{" "}
        <Button
          className="w-[120px] cursor-pointer p-2 bg-green-600 hover:bg-green-500"
          onClick={downloadPdf}
        >
          {" "}
          Print To PDF{" "}
        </Button>{" "}
      </div>
    </>
  );
};

export default ViewOrder;
