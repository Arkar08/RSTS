import { Suspense } from "react";
import View from "./routes/View";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./components/shared/Loading";
import { Toaster } from "sonner";
import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";

function App() {
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
        <Suspense fallback={<Loading />}>
          <View />
          <Toaster />
        </Suspense>
      </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
