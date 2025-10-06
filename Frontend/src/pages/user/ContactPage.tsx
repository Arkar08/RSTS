import InputFormField from "@/components/shared/InputFormField";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaField from "@/components/shared/TextAreaField";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { useLayoutEffect, useState } from "react";
import Loading from "@/components/shared/Loading";
import { useLocation } from "react-router-dom";

const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().min(1, { message: "Email is required." }),
  message: z.string().min(1, { message: "Message is required." }),
});

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  const { control, handleSubmit, reset } = form;
  const submit = async (values: z.infer<typeof contactSchema>) => {
    setLoading(true);
    const serviceId = "service_02wpntk";
    const templateId = "template_r659lum";
    const pubicKey = "mfJVHmBNr3uuFQ9Pp";

    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      to_name: "RSTS Vintage Team",
      message: values.message,
    };
    try {
      emailjs
        .send(serviceId, templateId, templateParams, pubicKey)
        .then((response) => {
          if (response.status === 200) {
            toast("Email sent successfully.", successToastStyle);
          }
          reset({
            name: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.log("error email send", error);
          toast(error.text, errorToastStyle);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-4 sm:p-2 gap-6 lg:p-4 p-2 mt-2 flex md:flex-row sm:flex-row lg:flex-row flex-col justify-around py-4">
          <div>
            <h3 className="text-blue-500 uppercase">Contact Me</h3>
            <h1 className="text-3xl font-bold">How can I help You?</h1>
            <p>Filled in the form or drop an email.</p>
          </div>
          <div className="max-w-[440px] w-full rounded-md p-3 shadow-md">
            <Form {...form}>
              <form onSubmit={handleSubmit(submit)}>
                <div>
                  <InputFormField
                    label="Name"
                    placeholder="Enter Name"
                    control={control}
                    name="name"
                  />
                </div>
                <div>
                  <InputFormField
                    label="Email"
                    placeholder="Enter Email"
                    control={control}
                    name="email"
                  />
                </div>
                <div>
                  <TextAreaField
                    placeholder="Message"
                    name="message"
                    label="Message"
                    control={control}
                  />
                </div>
                <div className="mt-8">
                  <Button className="bg-green-600 hover:bg-green-500 cursor-pointer w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
      <div className="h-[77px]"></div>
    </div>
  );
};

export default ContactPage;
