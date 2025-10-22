import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaField from "../shared/TextAreaField";
import CancelButton from "../shared/CancelButton";
import SubmittedBtn from "../shared/SubmittedBtn";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { useState } from "react";
import Loading from "../shared/Loading";
import { useAdvertising } from "@/hooks/useAdvertising";

const createAdvertisings = z.object({
  title: z.string().min(1, { message: "title is required." }),
});

const CreateAdvertising = () => {
  const navigate = useNavigate();
  const { createAdvertising } = useAdvertising();

  const form = useForm<z.infer<typeof createAdvertisings>>({
    resolver: zodResolver(createAdvertisings),
    mode: "all",
    defaultValues: {
      title: "",
    },
  });

  const { control, handleSubmit, reset } = form;
  const [createLoading, setCreateLoading] = useState(false);

  const submit = async (values: z.infer<typeof createAdvertisings>) => {
    try {
      setCreateLoading(true);
      const res = await createAdvertising.mutateAsync(values);
      if (
        res.status === 201 &&
        res.message === "Create Advertising Successfully."
      ) {
        reset({
          title: "",
        });
        toast(`${res.message}`, successToastStyle);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, errorToastStyle);
    } finally {
      setCreateLoading(false);
      navigate("/admin/advertising");
    }
  };

  const cancelBtn = () => {
    reset({
      title: "",
    });
    navigate("/admin/advertising");
  };

  if (createLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="h-[60px] border-2 rounded-md flex justify-between items-center px-4 shadow-md">
        <h3 className="text-xl">Create Advertising</h3>
      </div>
      <div className="h-[calc(100vh-220px)] border-2 rounded-md shadow-md p-2 mt-2 relative">
        <Form {...form}>
          <form onSubmit={handleSubmit(submit)}>
            <div className="px-4">
              <div>
                <TextAreaField
                  placeholder="advertising title"
                  name="title"
                  label="Advertising Title"
                  control={control}
                />
              </div>
            </div>
            <div className="h-[60px] mt-2 flex justify-center gap-4 items-center w-full absolute bottom-0">
              <CancelButton title="Cancel" cancelClick={cancelBtn} />
              <SubmittedBtn title="Create" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateAdvertising;
