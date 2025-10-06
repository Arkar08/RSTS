import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import InputFormField from "@/components/shared/InputFormField";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { useState } from "react";

const loginSchema = z.object({
  email: z
  .string()
  .min(1, { message: "Email is required." })
  .email({ message: "Enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required." }),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const { login } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      const data = await login.mutateAsync(values);
      if (data.message === "Login Successfully") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data._id);
        if (data.role === "Admin") {
          toast(data.message, successToastStyle);
          navigate("/admin/dashboard");
          window.location.reload();
        } else {
          toast(data.message, successToastStyle);
          navigate("/");
          window.location.reload();
        }
        reset({
          email: "",
          password: "",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.response.data.message, errorToastStyle);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="cursor-pointer bg-black text-white hover:bg-none m-4"
      >
        ← Back to Home
      </Button>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[440px] w-[100%] mt-[30px] shadow-lg mx-auto p-6 rounded-md"
        >
          <h3 className="text-3xl font-semibold text-center space-x-2.5">
            RSTS Vintage Shop
          </h3>
          <h2 className="text-xl text-center pt-2 uppercase text-green-600">
            Login
          </h2>
          <div className="mt-4">
            <InputFormField
              placeholder={"Enter Email"}
              type={"text"}
              control={control}
              name={"email"}
              label={"Email"}
              disable={loading}
            />
          </div>
          <div className="mt-4">
            <InputFormField
              placeholder={"Enter Password"}
              type={"text"}
              control={control}
              name={"password"}
              label={"Password"}
              disable={loading}
            />
          </div>
          <div className="mt-4">
            <p className="text-sm">
              Not registered yet?{" "}
              <Link to="/auth/signup" className="text-blue-600">
                Create an Account
              </Link>
            </p>
          </div>
          <div className="mt-4 w-[100%]">
            <Button
              variant="outline"
              className="w-[100%]  cursor-pointer bg-blue-600 text-white h-[50px]"
              type="submit"
            >
              {loading ? "Logging" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
