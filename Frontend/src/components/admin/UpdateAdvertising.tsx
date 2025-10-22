import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaField from "../shared/TextAreaField";
import CancelButton from "../shared/CancelButton";
import SubmittedBtn from "../shared/SubmittedBtn";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import { useMutateAdvertising } from "@/hooks/useAdvertising";

const updateAdvertisings = z.object({
  title: z.string().min(1, { message: "title is required." }),
});

const UpdateAdvertising = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const located = id ?? "";
  const { updateAdvertising, getAdvertising } = useMutateAdvertising({
    id: located,
  });
  const { data: advertising, isSuccess } = getAdvertising;

  const form = useForm<z.infer<typeof updateAdvertisings>>({
    resolver: zodResolver(updateAdvertisings),
    mode: "all",
    defaultValues: {
      title: advertising?.title,
    },
  });

  const { control, handleSubmit, reset } = form;
  useEffect(() => {
    if (advertising && isSuccess) {
      reset({
        title: advertising?.title,
      });
    }
  }, [advertising, isSuccess, reset]);
  const [updateLoading, setUpdateLoading] = useState(false);

  const submit = async (values: z.infer<typeof updateAdvertisings>) => {
    const data = {
      ...values,
      _id: located,
    };
    try {
      const res = await updateAdvertising.mutateAsync(data);
      if (
        res.status === 200 &&
        res.message === "Update Advertising Successfully."
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
      setUpdateLoading(false);
      navigate("/admin/advertising");
    }
  };

  const cancelBtn = () => {
    reset({
      title: "",
    });
    navigate("/admin/advertising");
  };

  if (updateLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="h-[60px] border-2 rounded-md flex justify-between items-center px-4 shadow-md">
        <h3 className="text-xl">Update Advertising</h3>
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
              <SubmittedBtn title="Update" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateAdvertising;
