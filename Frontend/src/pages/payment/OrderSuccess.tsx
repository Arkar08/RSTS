import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {

    const navigate = useNavigate()

    const continueToShopping = () => {
        localStorage.removeItem("cart")
        navigate("/collection")
        window.location.reload()
    }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="border-2 max-w-md w-full bg-white shadow rounded-md p-6 text-center">
        <img src="check.png" alt="success" className="mx-auto w-24 h-24 sm:w-32 sm:h-32" />
        <h3 className="text-xl sm:text-2xl font-bold mt-4 text-green-500">Order Successful.</h3>
        <p className="mt-2 text-gray-600">Thank you for your Order.</p>
        <Button className="mt-4 bg-green-600 hover:bg-green-500 cursor-pointer w-full sm:w-auto px-6" onClick={continueToShopping}>
          Continue to Shopping
        </Button>
      </div>
    </div>
  )
}

export default OrderSuccess
