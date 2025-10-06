import CancelButton from "@/components/shared/CancelButton";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { successToastStyle } from "@/utils/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();

  const cancelBtn = () => {
    navigate("/admin/dashboard");
  };

  const { logout } = useAuth();
  const [loading,setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
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
    <div className="flex justify-center items-center h-full w-full">
      <div className="max-w-[440px] w-full shadow-lg rounded h-[200px] p-3 flex flex-col justify-center items-center">
        <h3 className="text-center text-2xl font-semibold">
          Are You Want To Logout?
        </h3>
        <div className="flex justify-center items-center gap-4 mt-12">
          <CancelButton title="No" cancelClick={cancelBtn} />
          <Button
            className="bg-green-600 hover:bg-green-500 cursor-pointer w-[120px]"
            onClick={handleLogout}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
