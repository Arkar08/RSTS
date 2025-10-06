import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import SideLayout from "./SideLayout"
import { Outlet } from "react-router-dom"


const Layout = () => {

    const {open} = useSidebar()
  return (
      <>
        <SideLayout />
        <div
          className={`${
            open
              ? "flex flex-col lg:w-[calc(100vw-16rem)] md:w-[calc(100vw-16rem)] sm:w-[100vw]"
              : "flex flex-col w-[100vw]"
          }`}
        >
          <div className="h-[60px] border-b-2 flex justify-between items-center px-[1rem]">
            <div className="flex items-center gap-5">
              <img src="/rsts.jpg" alt="logoImage" className="w-10 h-10 rounded-md"/>
              <h3 className="text-xl font-semibold">RSTS Vintage Shop</h3>
              <SidebarTrigger className="cursor-pointer mt-2" />
            </div>
          </div>
          <div className="px-5 py-2 h-[calc(100vh-60px)]">
            <Outlet />
          </div>
        </div>
      </>
  )
}

export default Layout
