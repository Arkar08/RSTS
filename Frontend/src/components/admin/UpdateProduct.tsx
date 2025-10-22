import { useForm } from "react-hook-form";
import InputFormField from "../shared/InputFormField";
import { Form } from "../ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectFormField from "../shared/SelectFormField";
import TextAreaField from "../shared/TextAreaField";
import CancelButton from "../shared/CancelButton";
import SubmittedBtn from "../shared/SubmittedBtn";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { useEffect, useState, type ChangeEvent } from "react";
import { CircleX } from "lucide-react";
import { useMutateProduct } from "@/hooks/useProduct";
import { useCategory } from "@/hooks/useCategory";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import Loading from "../shared/Loading";
import RadioFormField from "../shared/RadioFormField";

const createProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  quantity: z.string().min(1, { message: "Quantity is required." }),
  price: z.string().min(1, { message: "Price is required." }),
  customerSalePrice:z.string(),
  productFeature: z
    .string()
    .min(1, { message: "Product Feature is required." }),
    isShippingRequired:z.string().min(1,{message:"Product Type is required."})
});

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const located = id ?? "";
  const { getProduct,updateProduct } = useMutateProduct({ id: located });
  const { data: product, isSuccess } = getProduct;
  const { dropdownCategory } = useCategory();
  const { data: category } = dropdownCategory;

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    mode: "all",
    defaultValues: {
      name: product?.data?.name ?? "",
      category: product?.data?.category ?? "",
      quantity: product?.data?.quantity.toString() ?? "",
      price: product?.data?.price.toString() ?? "",
      customerSalePrice:product?.data?.customerSalePrice.toString() ?? "",
      productFeature: product?.data?.productFeature ?? "",
      isShippingRequired:product?.data?.isShippingRequired ?? ""
    },
  });

  const imageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 4) {
      toast("You can only upload 4 images for a product", errorToastStyle);
    }
    const file = e.target.files && e.target.files[0];
    try {
      if (file && images.length < 4) {
        setLoading(true);
        const data = new FormData();
        data.append("file", file);
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
        setImages((prev) => [...prev, uploadImageUrl.url]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast("image upload failed", errorToastStyle);
    } finally {
      setLoading(false);
    }
  };

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (product && isSuccess) {
      reset({
        name: product?.data?.name,
        category: product?.data?.category,
        quantity: product?.data?.quantity.toString(),
        price: product?.data?.price.toString(),
        productFeature: product?.data?.productFeature,
        customerSalePrice:product?.data?.customerSalePrice.toString(),
        isShippingRequired:product?.data?.isShippingRequired
      });
      setImages(product.data.images);
    }
  }, [product, isSuccess, reset]);

  const submit = async(values: z.infer<typeof createProductSchema>) => {
    setUpdateLoading(true);
    const data = {
      ...values,
      _id:located,
      images: images,
      price: Number(values.price),
      quantity: Number(values.quantity),
      customerSalePrice:Number(values.customerSalePrice)
    };
     if (data.images.length > 0) {
          try {
            const res = await updateProduct.mutateAsync(data);
            if (
              res.status === 200 &&
              res.message === "Update Product Successfully."
            ) {
              setImages([]);
              reset({
                name: "",
                category: "",
                quantity: "",
                price: "",
                customerSalePrice:"",
                productFeature: "",
                isShippingRequired:""
              });
              toast(`${res.message}`, successToastStyle);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            toast(`${error.response.data.message}`, errorToastStyle);
          } finally {
            setUpdateLoading(false);
            navigate("/admin/products");
          }
        } else {
          toast("Please upload an image", errorToastStyle);
        }
  };

  const cancelBtn = () => {
    reset({
      name: "",
      category: "",
      quantity: "",
      price: "",
      customerSalePrice:"",
      productFeature: "",
      isShippingRequired:""
    });
    setImages([]);
    navigate("/admin/products");
  };

  if(updateLoading){
    return <Loading />;
  }

  const handleRemoveImage = (url: string) => {
    const newImages = images.filter((image) => image !== url);
    setImages(newImages);
  };

  return (
    <div>
      <div className="h-[60px] border-2 rounded-md mt-1 flex justify-between items-center px-4 shadow-md">
        <h3 className="text-xl">Update Product</h3>
      </div>
      <div className="h-[calc(100vh-160px)] overflow-y-auto border-2 rounded-md shadow-md p-2 mt-1">
        <Form {...form}>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div>
                <InputFormField
                  placeholder="Name"
                  name="name"
                  label="Name"
                  control={control}
                />
              </div>
              <div>
                <SelectFormField
                  control={control}
                  name="category"
                  label="Category"
                  placeholder="Select Category"
                  categoryList={category}
                />
              </div>
              <div>
                <InputFormField
                  placeholder="Quantity"
                  name="quantity"
                  label="Quantity"
                  control={control}
                  type={"number"}
                />
              </div>
              <div>
                <InputFormField
                  placeholder="Price"
                  name="price"
                  label="Price"
                  control={control}
                  type={"number"}
                />
              </div>
              <div>
                <InputFormField
                  placeholder="Discount Price"
                  name="customerSalePrice"
                  label="Discount Price"
                  control={control}
                  type={"number"}
                />
              </div>
              <div>
                <TextAreaField
                  placeholder="Product Features"
                  name="productFeature"
                  label="Product Features"
                  control={control}
                />
              </div>
              <div>
                <div className="mt-2">
                  <label
                    htmlFor="Upload Profile"
                    style={{ fontSize: 16 }}
                    className="font-semibold"
                  >
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
              </div>
              <div>
                <RadioFormField control={control} name='isShippingRequired'/>
              </div>
            </div>
            <div className="mt-4 h-[120px] mx-auto rounded-md">
              <div className="grid grid-cols-4  gap-2 mx-auto ">
                {images.length ? (
                  images.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-[120px] h-[120px] overflow-hidden shadow rounded-md"
                    >
                      <CircleX
                        onClick={() => handleRemoveImage(url)}
                        className="cursor-pointer absolute top-1 right-1 text-gray-500   hover:text-red-500  transition"
                      />
                      <img
                        src={url}
                        alt={`product${index}`}
                        className="rounded-md object-cover  w-full"
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}

                {loading && (
                  <div className="rounded-md w-[180px] h-full animate-pulse bg-muted flex items-center justify-center col-span-1">
                    <span className="text-sm text-muted-foreground">
                      Uploading image...
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="h-[60px] mt-2 flex justify-center gap-4 items-center w-full">
              <CancelButton title="Cancel" cancelClick={cancelBtn} />
              <SubmittedBtn title="Update" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProduct;
