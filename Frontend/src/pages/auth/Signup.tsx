import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import InputFormField from "@/components/shared/InputFormField";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const signupSchema = z.object({
  name:z.string().min(1, {message:"Name is required."}),
  email: z
  .string()
  .min(1, { message: "Email is required." })
  .email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required." }),
  phoneNumber:z.string().min(1,{message:'Phone Number is required.'})
});

const Signup = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "all",
    defaultValues: {
      name:"",
      email: "",
      password: "",
      phoneNumber:""
    },
  });

  const { control, handleSubmit,reset } = form;
  const navigate = useNavigate()
  const {signup} = useAuth()
  const [loading,setLoading] = useState(false)

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setLoading(true)
    try {
        const data = await signup.mutateAsync(values)
        if(data.message === 'Signup Successfully'){
          localStorage.setItem('token',data.token)
          localStorage.setItem('role',data.role)
          localStorage.setItem('userId',data._id)
          toast(data.message,successToastStyle)
          navigate('/auth/login')
          reset({
            name:"",
            email:"",
            password:"",
            phoneNumber:""
          })
        }
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (error:any) {
        toast(error.response.data.message,errorToastStyle)
     }finally{
      setLoading(false)
     }
  };
  return (
    <div className="p-2">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[440px] w-[100%] mt-[30px] shadow-lg mx-auto p-6 rounded-md"
        >
          <h3 className="text-3xl font-semibold text-center space-x-2.5">
            RSTS Vintage Shop
          </h3>
          <h2 className="text-xl text-green-600 text-center pt-2 uppercase">Create an acccount</h2>
          <div className="mt-1">
            <InputFormField
              placeholder={"Enter Name"}
              type={"text"}
              control={control}
              name={"name"}
              label={"Name"}
              disable={loading}
            />
          </div>
          <div className="mt-1">
            <InputFormField
              placeholder={"Enter Email"}
              type={"text"}
              control={control}
              name={"email"}
              label={"Email"}
              disable={loading}
            />
          </div>
          <div className="mt-1">
            <InputFormField
              placeholder={"Enter Password"}
              type={"text"}
              control={control}
              name={"password"}
              label={"Password"}
              disable={loading}
            />
          </div>
          <div className="mt-1">
            <InputFormField
              placeholder={"Enter Phone Number"}
              type={"text"}
              control={control}
              name={"phoneNumber"}
              label={"Phone Number"}
              disable={loading}
            />
          </div>
          <div className="mt-4">
            <p className="text-sm">
              Already have an account? 
              <Link to="/auth/login" className="text-blue-600">
                  Login
              </Link>
            </p>
          </div>
          <div className="mt-4 w-[100%]">
            <Button
              variant="outline"
              className="w-[100%] h-[50px] cursor-pointer bg-blue-600 text-white"
              type="submit"
            >
              {loading ? 'Creating Account':"Sign up"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
