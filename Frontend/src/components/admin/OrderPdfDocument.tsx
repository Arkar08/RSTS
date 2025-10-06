import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles for PDF document
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 20, paddingLeft: 10 },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  bold: { fontWeight: "bold" },

  // Table styles
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    paddingBottom: 4,
    marginBottom: 4,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    paddingVertical: 4,
  },
  tableColProductName: {
    width: "50%",
  },
  tableColQuantity: {
    width: "25%",
    textAlign: "center",
  },
  tableColPrice: {
    width: "25%",
    textAlign: "right",
  },
  list: {
    paddingLeft: 10,
    marginTop: 10,
  },
  bottomText: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: "5px",
  },
  normal: {
    color: "orange",
  },
  status: {
    color: "green",
  },
});

// Define prop types (you can improve this based on your actual order type)
interface Product {
  _id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}

interface Delivery {
  name: string;
  company?: string;
  country: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postCode: string;
  phoneNumber: string;
}

interface Order {
  _id: string;
  email: string;
  name: string;
  paymentDate: string;
  paymentMethod: string;
  delivery: Delivery;
  products: Product[];
  totalPayment: number;
  shippingFees: number;
  status: string;
}

interface OrderPdfDocumentProps {
  order: Order;
}

const OrderPdfDocument: React.FC<OrderPdfDocumentProps> = ({ order }) => (
  <Document>
    <Page style={styles.page}>
      {/* Order Header */}
      <View style={styles.section}>
        <Text style={styles.header}>Order History</Text>
        <Text style={styles.bold}>Order No - {order._id}</Text>
      </View>

      {/* Customer Info */}
      <View style={styles.section}>
        <Text style={styles.bold}>Customer's Information</Text>
        <Text style={styles.list}>Name - {order.name}</Text>
        <Text style={styles.list}>Email - {order.email}</Text>
        <Text style={styles.list}>
          Phone Number - {order.delivery.phoneNumber}
        </Text>
        <Text style={styles.list}>Country - {order.delivery.country}</Text>
      </View>

      {/* Payment Info */}
      {order.status === "Delivered" ? (
        <View style={styles.section}>
          <Text style={styles.bold}>Payment Information</Text>
          <Text style={styles.list}>Payment Date - {order.paymentDate}</Text>
          <Text style={styles.list}>
            Payment Method - {order.paymentMethod}
          </Text>
          <Text style={styles.list}>
            Payment Status-{" "}
            <Text
              style={
                order.status === "Delivered" ? styles.normal : styles.status
              }
            >
              {order.status}
            </Text>
          </Text>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.bold}>Order Information</Text>
          <Text style={styles.list}>Order Date - {order.paymentDate}</Text>
          <Text style={styles.list}>
            Order Status-{" "}
            <Text
              style={
                order.status === "Delivered" ? styles.normal : styles.status
              }
            >
              {order.status}
            </Text>
          </Text>
        </View>
      )}

      {/* Delivery Address */}
      {order.status === "Delivered" && (
        <View style={styles.section}>
          <Text style={styles.bold}>Delivery Address</Text>
          <Text style={styles.list}>Name - {order.delivery.name}</Text>
          {order.delivery.company ? (
            <Text style={styles.list}>Company - {order.delivery.company}</Text>
          ) : (
            <Text></Text>
          )}
          <Text style={styles.list}>Country - {order.delivery.country}</Text>
          <Text style={styles.list}>Address - {order.delivery.address}</Text>
          {order.delivery.address2 ? (
            <Text style={styles.list}>
              Address2 - {order.delivery.address2}
            </Text>
          ) : (
            <Text></Text>
          )}
          <Text style={styles.list}>City - {order.delivery.city}</Text>
          <Text style={styles.list}>State - {order.delivery.state}</Text>
          <Text style={styles.list}>PostCode - {order.delivery.postCode}</Text>
        </View>
      )}

      {/* Products Table */}
      <View style={styles.section}>
        <Text style={styles.bold}>Products</Text>

        {/* Table Header */}
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableColProductName}>Product No.</Text>
          <Text style={styles.tableColProductName}>Product Name</Text>
          <Text style={styles.tableColQuantity}>Quantity</Text>
          <Text style={styles.tableColPrice}>Price</Text>
        </View>

        {/* Table Rows */}
        {order.products.map((product, index) => (
          <View key={product._id} style={styles.tableRow}>
            <Text style={styles.tableColProductName}>{index + 1}</Text>
            <Text style={styles.tableColProductName}>{product.name}</Text>
            <Text style={styles.tableColQuantity}>{product.quantity}</Text>
            <Text style={styles.tableColPrice}>${product.totalPrice} AUD</Text>
          </View>
        ))}
      </View>

      {/* Total Payment */}
      <View style={styles.section}>
        {order.status === "Delivered" ? (
          <>
            <Text style={styles.bottomText}>
              SubTotal: ${order.totalPayment - order.shippingFees} AUD
            </Text>
            <Text style={styles.bottomText}>
              Shipping Fees: ${order.shippingFees} AUD
            </Text>
          </>
        ) : (
          <Text style={styles.bottomText}>
            SubTotal: ${order.totalPayment} AUD
          </Text>
        )}
        <Text style={styles.bottomText}>
          Total Payment: ${order.totalPayment} AUD
        </Text>
      </View>
    </Page>
  </Document>
);

export default OrderPdfDocument;
