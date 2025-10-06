/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderPdfDocument from "@/components/admin/OrderPdfDocument";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutationOrder } from "@/hooks/useOrder";
import { pdf } from "@react-pdf/renderer";
import moment from "moment";
import { useLayoutEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const HistoryDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const located = id ?? "";
  const { getOrder } = useMutationOrder({ id: located });
  const { data: orders, isLoading } = getOrder;
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orders) return <div>Order not found</div>;

  const downloadPdf = async () => {
    // Create PDF instance with the document and order data
    const doc = (
      <OrderPdfDocument
        order={{
          ...orders,
          paymentDate: moment(orders.paymentDate).format("lll"),
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
    <div className="p-6">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="cursor-pointer bg-black text-white hover:bg-none"
      >
        ← Back to Orders
      </Button>

      <h2 className="text-xl font-semibold mt-4 mb-6">
        Order Details: {orders._id}
      </h2>

      {/* Order Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Customer Name:</strong> {orders.name}
            </p>
            <p>
              <strong>Email:</strong> {orders.email}
            </p>
            <p>
              <strong>Phone:</strong> {orders.delivery.phoneNumber}
            </p>
            {orders.status === "Delivered" && (
              <>
                {orders.delivery.address2 ? (
                  <p>
                    <strong>Address:</strong> {orders.delivery.address},
                    {orders.delivery.adddress2},{orders.delivery.city},
                    {orders.delivery.state}
                  </p>
                ) : (
                  <p>
                    <strong>Address:</strong> {orders.delivery.address},
                    {orders.delivery.city},{orders.delivery.state}
                  </p>
                )}
                <p>
                  <strong>Country:</strong> {orders.delivery.country}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Order Date:</strong>{" "}
              {moment(orders.paymentDate).format("lll")}
            </p>
            <p>
              <strong>Order ID:</strong> {orders._id}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  orders.status === "Delivered"
                    ? "text-orange-500"
                    : "text-green-500"
                }
              >
                {orders.status}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Info</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.status === "Delivered" && (
              <p>
                <strong>Method:</strong> {orders.paymentMethod}
              </p>
            )}
            {orders.status === "Delivered" ? (
              <>
                <p className="text-lg">
                  <strong>SubTotal:</strong> ${" "}
                  {(orders.totalPayment - orders.shippingFees).toLocaleString()}{" "}
                  AUD
                </p>
                <p className="text-lg">
                  <strong>Shipping Fees:</strong> ${" "}
                  {orders.shippingFees.toLocaleString()} AUD
                </p>
              </>
            ) : (
              <p className="text-lg">
                <strong>SubTotal:</strong> ${" "}
                {orders.totalPayment.toLocaleString()} AUD
              </p>
            )}
            <p className="text-lg">
              <strong>Total:</strong> $ {orders.totalPayment.toLocaleString()}{" "}
              AUD
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <div className="mt-8 bg-white shadow rounded-2xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border-b text-left">Item</th>
              <th className="p-4 border-b">Quantity</th>
              <th className="p-4 border-b">Price</th>
              <th className="p-4 border-b">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orders.products.map((item: any) => (
              <tr key={item.product} className="hover:bg-gray-50">
                <td className="p-4 border-b text-nowrap">{item.name}</td>
                <td className="p-4 border-b text-center">{item.quantity}</td>
                <td className="p-4 border-b text-right text-nowrap">
                  ${item.totalPrice} AUD
                </td>
                <td className="p-4 border-b text-right text-nowrap">
                  ${item.totalPrice * item.quantity} AUD
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="px-6 cursor-pointer" onClick={downloadPdf}>
          Download Invoice
        </Button>
      </div>
    </div>
  );
};

export default HistoryDetailPage;
