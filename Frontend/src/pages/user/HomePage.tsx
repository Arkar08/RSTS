import CategoryUser from "@/components/user/CategoryUser";
import NewProductList from "@/components/user/NewProductList";
import ServiceUser from "@/components/user/ServiceUser";
import TrendingProducts from "@/components/user/TrendingProducts";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {

  const {pathname} = useLocation();

  useLayoutEffect(()=>{
    window.scrollTo(0,0);
  },[pathname])

  return (
    <div className="px-4 mt-2">
        <div className="w-full h-[400px] lg:h-[550px] md:h-[450px] ">
          <img src="./Media (1).jpg" alt="logo"  className="w-full h-full object-center rounded-md"/>
        </div>
        <div>
          <CategoryUser />
          <TrendingProducts />
          <ServiceUser />
          <NewProductList />
        </div>
    </div>
  )
}

export default HomePage;
