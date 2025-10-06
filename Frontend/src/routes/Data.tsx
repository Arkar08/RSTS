import CreateProduct from "@/components/admin/CreateProduct";
import UpdateProduct from "@/components/admin/UpdateProduct";
import ViewOrder from "@/components/admin/ViewOrder";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import CategoryProducts from "@/components/user/CategoryProducts";
import MainLayout from "@/layouts/MainLayout";
import UserLayout from "@/layouts/UserLayout";
import Category from "@/pages/admin/Category";
import Dashboard from "@/pages/admin/Dashboard";
import Order from "@/pages/admin/Order";
import Product from "@/pages/admin/Product";
import User from "@/pages/admin/User";
import Login from "@/pages/auth/Login";
import Logout from "@/pages/auth/Logout";
import Signup from "@/pages/auth/Signup";
import NotFound from "@/pages/notfound/NotFound";
import Success from "@/pages/payment/Success";
import Cancel from "@/pages/payment/Cancel";
import Cart from "@/pages/user/Cart";
import CollectionPage from "@/pages/user/CollectionPage";
import ContactPage from "@/pages/user/ContactPage";
import HistoryDetailPage from "@/pages/user/HistoryDetailPage";
import HomePage from "@/pages/user/HomePage";
import OrderHistory from "@/pages/user/OrderHistory";
import PrivacyPolicy from "@/pages/user/PrivacyPolicy";
import ProductDetail from "@/pages/user/ProductDetail";
import ProductDisclaimer from "@/pages/user/ProductDisclaimer";
import ReturnPolicy from "@/pages/user/ReturnPolicy";
import ShippingPolicy from "@/pages/user/ShippingPolicy";
import CheckOutPage from "@/pages/user/CheckOutPage";
import OrderSuccess from "@/pages/payment/OrderSuccess";

  const isAuth = !!localStorage.getItem("token")

const Data = [
    { path: "auth/login", element: <Login /> },
    { path: "auth/signup", element: <Signup /> },
    {path:"success",element:<Success />},
    {path:"cancel",element:<Cancel />},
    {path:"orderSuccess",element:<OrderSuccess />},
    {
      path: "/admin",
      element: <MainLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "user", element: <User /> },
        { path: "category", element: <Category /> },
        { path: "products", element: <Product /> },
        { path: "products/create", element: <CreateProduct /> },
        { path: "products/:id", element: <UpdateProduct /> },
        { path: "orders", element: <Order /> },
        { path: "orders/:id", element: <ViewOrder /> },
        { path: "auth/logout", element: <Logout /> },
      ],
    },

    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: ":category", element: <CategoryProducts /> },
        { path: "collection", element: <CollectionPage /> },
        { path: "collection/:id", element: <ProductDetail /> },
        { path: "contact", element: <ContactPage /> },
        { path: "cart", element: <Cart /> },
        {path:"checkout",element:<CheckOutPage />},
        { path: "return-policy", element: <ReturnPolicy /> },
        { path: "shipping-policy", element: <ShippingPolicy /> },
        { path: "product-disclaimer", element: <ProductDisclaimer /> },
        { path: "privacy-policy", element: <PrivacyPolicy /> },
        {
          path: "orderHistory",
          element: (
            <ProtectedRoute isAuth={isAuth} element={<OrderHistory />} />
          ),
        },
        {
          path: "orderHistory/:id",
          element: (
            <ProtectedRoute isAuth={isAuth} element={<HistoryDetailPage />} />
          ),
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ];
 

export default Data;
