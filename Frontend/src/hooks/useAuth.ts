import Axios from "@/config/ApiConfig";
import { useMutation } from "@tanstack/react-query"

interface LoginProps  {
    email:string,
    password:string
}

interface SignupProps {
    name:string,
    email:string,
    password:string,
    phoneNumber:string
}


const loginUser = async(data:LoginProps) => {
    const res = await Axios.post("auth/login", data);
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
}

const signUpUser = async(data:SignupProps) => {
    const res = await Axios.post("auth/signup", data);
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error(res.data.message);
  }
}

const logoutUser = async() => {
    const res = await Axios.post('auth/logout')
    if(res.status === 200){
        return res.data;
    }else{
        throw new Error(res.data.message)
    }
}

export const useAuth = () => {
    const login = useMutation({
        mutationKey:['Login'],
        mutationFn:(data:LoginProps) => loginUser(data)
    })

    const signup = useMutation({
        mutationKey:['Signup'],
        mutationFn:(data:SignupProps) => signUpUser(data)
    })

    const logout = useMutation({
        mutationKey:['Logout'],
        mutationFn:logoutUser
    })

    return {login,logout,signup}
}