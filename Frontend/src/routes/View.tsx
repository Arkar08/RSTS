// View.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Data from "./Data";

const View = () => {
  const router = createBrowserRouter(Data);
  return <RouterProvider router={router} />;
};

export default View;
