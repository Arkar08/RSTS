import { useForm } from "react-hook-form";
import InputFormField from "../shared/InputFormField";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import CancelButton from "../shared/CancelButton";
import SubmittedBtn from "../shared/SubmittedBtn";
import { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { useCategory } from "@/hooks/useCategory";
import Loading from "../shared/Loading";

const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateCategory = ({ setOpen }: any) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [createLoading,setCreateLoading] = useState(false)
  const { createCategory } = useCategory();

  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageUpload = async (event: any) => {
    const files = event.target.files[0];
    if(!files){
      return ;
    }

    try {
       setLoading(true);
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "hotel-image");
      data.append("cloud_name", "dwcdqx2tm");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwcdqx2tm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const uploadImageUrl = await res.json();
      setImage(uploadImageUrl.url);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log(error)
      toast("Image upload failed", errorToastStyle);
    }finally{
      setLoading(false)
    }
  };

  const { control, handleSubmit, reset } = form;

  const submit = async (values: z.infer<typeof createCategorySchema>) => {
    if (image !== "" && values.name) {
      const data = { ...values, image: image };
      try {
        setCreateLoading(true)
        const res = await createCategory.mutateAsync(data);
        if (
          res.status === 201 &&
          res.message === "Create Category Successfully."
        ) {
          setImage("");
          reset({
            name: "",
          });
          toast(`${res.message}`, successToastStyle);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(`${error.response.data.message}`, errorToastStyle);
      }finally{
        setOpen(false)
        setCreateLoading(false)
      }
    } else {
      toast("Please upload an image", errorToastStyle);
    }
  };

  const cancelBtn = () => {
    reset({
      name: "",
    });
    setImage("");
    setOpen(false);
  };

  if(createLoading){
    return <Loading />;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <InputFormField
            label="Category Name"
            placeholder="Enter Category Name"
            control={control}
            name="name"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="Upload Profile" className="text-sm font-[500]">
            Upload Profile
          </label>
          {loading ? (
            <div className="h-[35px] border-1 rounded-md px-2 py-1 text-center cursor-pointer">
              <label htmlFor="upload" className="cursor-pointer">
                Uploading...
              </label>
            </div>
          ) : (
            <div className="h-[35px] border-1 rounded-md px-2 py-1 mt-2 text-center cursor-pointer">
              <label htmlFor="upload" className="cursor-pointer">
                Profile Upload
              </label>
              <Input
                type="file"
                id="upload"
                className="mt-3 cursor-pointer"
                hidden
                placeholder="upload Profile"
                accept="image/*"
                onChange={imageUpload}
              />
            </div>
          )}
        </div>
        <div className="w-[180px] h-[180px] shadow-lg rounded-md mx-auto mt-4">
          {loading && (
            <div className="rounded-2xl aspect-video w-full animate-pulse bg-muted flex items-center justify-center col-span-1 h-[100%]">
              <span className="text-sm text-muted-foreground">
                Uploading image...
              </span>
            </div>
          ) }
            {
              image && (
                <img src={image} className="w-full h-full rounded-md" />
              )
            }
          
        </div>
        <div className="flex gap-4 mt-4 justify-center items-center">
          <CancelButton title={"Cancel"} cancelClick={cancelBtn} />
          <SubmittedBtn title={"Create"} />
        </div>
      </form>
    </Form>
  );
};

export default CreateCategory;
