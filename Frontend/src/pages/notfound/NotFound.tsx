import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate()
  const backToLogin = () => {
    navigate("/auth/login")
  }

  return (
    <div className="flex justify-center items-center mt-20 flex-col h-full">
      <h3 className="text-3xl font-bold">404 Not Found</h3>
      <Button className="mt-8 cursor-pointer" onClick={backToLogin}>Back To Login</Button>
    </div>
  )
}

export default NotFound
