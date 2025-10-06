import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import Layout from "./Layout";

const MainLayout = () => {

  return (
    <div className="select-none">
      <SidebarProvider>
        <Layout />
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
