import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { TableBody, TableCell, TableRow } from "../ui/table";
import type { ProductProps } from "@/utils/Constant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ConfirmDeleteDialog } from "../shared/ComfirmDelete";
import { useProduct } from "@/hooks/useProduct";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";

interface Product {
  product:ProductProps,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearchData:any;
}

const ProductBody = ({product,setSearchData}:Product) => {

  const navigate = useNavigate()
  const [deleteConfirm,setDeleteConfirm] = useState({
    deleteId:"",
    delete:false
  })
  const {deleteProduct} = useProduct()

  const updateProduct = (id:string) => {
    setSearchData("")
    navigate(`/admin/products/${id}`)
  }

   const handleClickDelete = (id:string) => {
    setSearchData("")
    setDeleteConfirm((prev)=>{
      return(
        {
          ...prev,delete:true,deleteId:id
        }
      )
    })
  };

  
  const handleDeleteProduct = async() => {
    try {
      const res = await deleteProduct.mutateAsync(deleteConfirm.deleteId)
      if(res.status === 200){
        toast(`${res.message}`,successToastStyle)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast(`${error.message}`,errorToastStyle)
    }finally{
      setDeleteConfirm((prev)=>{
          return(
            {
              ...prev,delete:false,deleteId:""
            }
          )
      })
    }
  }

  const handleCancelDeleteProduct = () =>{
    setDeleteConfirm((prev)=>{
      return(
        {
          ...prev,delete:false,deleteId:""
        }
      )
    })
  }

  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <div className="w-[50px] h-[50px]  rounded-md shadow-lg mx-auto">
            <img
              src={product.images[0]}
              alt="user.profile"
              className="w-full h-full rounded-md shadow-md object-cover"
            />
          </div>
        </TableCell>
        <TableCell className="max-w-xs break-words whitespace-pre-wrap">
            <p className="text-sm text-gray-700 text-center">{product.name}</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}} className="capitalize text-sm text-gray-700 text-center">{product.category}</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}} className="font-semibold">{product.quantity}</p>
        </TableCell>
        <TableCell className="text-right">
            <p className="font-semibold" style={{fontSize:16}}>$ {product.price} AUD</p>
        </TableCell>
        <TableCell className="text-right">
            <p className="font-semibold" style={{fontSize:16}}>$ {product.customerSalePrice} AUD</p>
        </TableCell>
        <TableCell className="max-w-xs break-words whitespace-pre-wrap">
            <p className="text-sm text-gray-700 text-center">
                {product.productFeature}
            </p>
        </TableCell>
        <TableCell className="text-center">
          <p className={product.isShippingRequired === 'pickUp Product'? 'text-center text-green-500 capitalize':'text-center text-orange-500 capitalize'}>{product.isShippingRequired}</p>
        </TableCell>
        <TableCell>
          <div className="flex gap-2 justify-center">
            <Button size="icon" className="size-8 bg-blue-600 cursor-pointer hover:bg-blue-500" onClick={()=>updateProduct(product._id)}>
            <Edit2 />
          </Button>
          <Button size="icon" className="size-8 bg-red-600 cursor-pointer hover:bg-red-500" onClick={()=>handleClickDelete(product._id)}>
            <Trash2 />
          </Button>
          <ConfirmDeleteDialog 
             open={deleteConfirm.delete}
            itemName={"Product "}
            handleConfirmDelete={handleDeleteProduct}
            handleCancelDelete = {handleCancelDeleteProduct}
            isPending={false}
          />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default ProductBody
