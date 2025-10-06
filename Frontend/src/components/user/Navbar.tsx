import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navItems } from "@/utils/Dummy";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartContext } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { successToastStyle } from "@/utils/Toast";
import { AuthContext } from "@/context/AuthContext";
import Loading from "../shared/Loading";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openSheet, setOpenSheet] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    setOpenSheet(false);
    setOpenDropdown(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;
  const context = useContext(CartContext);
  const contextAuth = useContext(AuthContext);

  if (!context) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  if (!contextAuth) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }

  const { cart } = context;
  const { isAuth } = contextAuth;
  const { logout } = useAuth();
  const [loading,setLoading] =useState(false)


  const handleLogout = async () => {
    setLoading(true)
    setOpenDropdown(false);
    setOpenSheet(false);
    const data = await logout.mutateAsync();

    if (data.message === "Logout Successfully.") {
      toast(data.message, successToastStyle);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("cart");
      localStorage.removeItem("userId");
      setLoading(false)
      setTimeout(()=>{
        window.location.reload()
      },200)
      navigate("/");
    }
  };

  if(loading){
    return <Loading />
  }

  return (
    <nav className="w-full px-6 py-2 flex items-center justify-between border-b h-[60px]">
      <div className="flex items-center gap-2">
        <img
          src="/rsts.jpg"
          alt="logo_image"
          className="w-[40px] h-[40px] rounded-md"
        />
        <Link to="/" className="text-xl font-bold text-center">
          RSTS Vintage Shop
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map(({ path, label, image }) => (
              <NavigationMenuItem key={path}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle({
                    className: isActive(path)
                      ? "bg-accent text-accent-foreground"
                      : "",
                  })}
                >
                  {!image ? (
                    <Link to={path}>{label}</Link>
                  ) : (
                    <Link to={path} className="relative">
                      <Badge
                        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-0 right-0 translate-x-1/5 -translate-y-1/3"
                        variant="destructive"
                      >
                        {cart.length}
                      </Badge>
                      <img src={image} />
                    </Link>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            {isAuth ? (
              <NavigationMenuItem>
                <DropdownMenu
                  open={openDropdown}
                  onOpenChange={setOpenDropdown}
                >
                  <DropdownMenuTrigger asChild>
                    <NavigationMenuLink className="cursor-pointer ml-4">
                      <img
                        src="/user (3).png"
                        alt="personProfile"
                        className="w-[30px] h-[30px] rounded-full border border-gray-300"
                      />
                    </NavigationMenuLink>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/orderHistory");
                        setOpenDropdown(false);
                      }}
                    >
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink href="/auth/login">
                  <p className="font-semibold">Login</p>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
            {/* User Dropdown */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-500">
            <SheetHeader>
              <SheetTitle className="text-white">RSTS Vintage Shop</SheetTitle>
              <SheetDescription className="text-gray-300">
                Navigate through the app
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-[60px]">
              {navItems.map(({ path, label, image }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setOpenSheet(false)}
                  className={`text-lg text-white font-medium px-4 py-2 ${
                    isActive(path) ? "bg-black p-2" : ""
                  }`}
                >
                  {label}
                  {image && (
                    <span className="pl-2 text-red-600">({cart.length})</span>
                  )}
                </Link>
              ))}
              {isAuth ? (
                <>
                  <Link
                    to="/orderHistory"
                    className="text-lg text-white font-medium px-4 py-2 cursor-pointer"
                  >
                    My Orders
                  </Link>
                  <p
                    onClick={handleLogout}
                    className="text-lg text-white font-medium px-4 py-2 cursor-pointer"
                  >
                    Logout
                  </p>
                </>
              ):(
                <Link
                    to="/auth/login"
                    className="text-lg text-white font-medium px-4 py-2 cursor-pointer"
                  >
                    Login
                  </Link>
              )
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
