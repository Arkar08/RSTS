import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Cancel = () => {

    const navigate = useNavigate()

    const continueHome = () => {
        navigate('/cart')
    }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="border-2 max-w-md w-full bg-white shadow rounded-md p-6 text-center">
        <img src="delete (1).png" alt="cancel" className="mx-auto w-24 h-24 sm:w-32 sm:h-32" />
        <h3 className="text-xl sm:text-2xl font-bold mt-4 text-red-500">Payment failed.</h3>
        <p className="mt-2 text-gray-600">Please pay again.</p>
        <Button className="mt-4 bg-red-600 hover:bg-red-500 cursor-pointer w-full sm:w-auto px-6" onClick={continueHome}>
          Continue Home
        </Button>
      </div>
    </div>
  )
}

export default Cancel
