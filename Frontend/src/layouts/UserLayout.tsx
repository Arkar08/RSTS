import Loading from "@/components/shared/Loading";
import SliceText from "@/components/shared/SliceText";
import Footer from "@/components/user/Footer";
import Navbar from "@/components/user/Navbar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {



  return (
    <div className="min-h-screen select-none relative">
       <SliceText />
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default UserLayout;
