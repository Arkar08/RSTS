import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { menuItems } from "@/utils/Dummy";
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const SideLayout = () => {

     const route = window.location.pathname;
     const {open} = useSidebar();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
            {
                open && (
                    <div className="my-4 flex flex-col justify-center items-center">
                        <Avatar className="w-[100px] h-[100px] shadow-lg">
                            <AvatarImage src="/rsts.jpg" className="object-cover"/>
                        </Avatar>
                        <p className="mt-2 font-bold text-xl capitalize">Admin</p>
                    </div>
                )
            }
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.text}>
                  <SidebarMenuButton asChild isActive={route === item.route ? true:false}>
                    <a href={item.route} className="my-1 py-[20px]">
                      <img src={item.image} alt="sidebarImage" />
                      <span>{item.text}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default SideLayout