import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { TableBody, TableCell, TableRow } from "../ui/table";
import type { CategoryProps } from "@/utils/Constant";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from "../ui/dialog";
import UpdateCategory from "./UpdateCategory";
import { ConfirmDeleteDialog } from "../shared/ComfirmDelete";
import { useCategory } from "@/hooks/useCategory";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";

interface Category{
    category:CategoryProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSearchCategoryData:any;
}

const CategoryBody = ({category,setSearchCategoryData}:Category) => {

  const [editCategory,setEditCategory] = useState({
    edit:false,
    editId:"",
    openConfirmDeleteDialog:false,
    deleteId:"",
  })

  const {deleteCategory} = useCategory()
  const editButton = (id:string) => {
    setSearchCategoryData('')
    setEditCategory((prev)=>{
      return(
        {
          ...prev,edit:true,editId:id
        }
      )
    })
  }

  const handleClickDelete = async(id:string) => {
    setSearchCategoryData('')
    setEditCategory((prev)=>{
          return(
            {
              ...prev,openConfirmDeleteDialog:true,deleteId:id
            }
          )
        })
  };

  const handleConfirmDeleteCategory =async() => {
     try {
      const res = await deleteCategory.mutateAsync(editCategory.deleteId)
      if(res.status === 200){
        toast(`${res.message}`,successToastStyle)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast(`${error.message}`,errorToastStyle)
    }finally{
      setEditCategory((prev)=>{
        return(
          {
            ...prev,openConfirmDeleteDialog:false
          }
        )
      })
    }
  }

  const handleCancelDeleteCategory = () =>{
    setEditCategory((prev)=>{
      return(
        {
          ...prev,openConfirmDeleteDialog:false,deleteId:""
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
              src={category.image}
              alt="user.profile"
              className="w-full h-full rounded-md shadow-md object-cover"
            />
          </div>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}} className="capitalize">{category.name}</p>
        </TableCell>
        <TableCell className="flex gap-2 justify-center mt-2">
          <Button size="icon" className="size-8 bg-blue-600 cursor-pointer hover:bg-blue-500" onClick={()=>editButton(category._id)}>
            <Edit2 />
          </Button>
          <Dialog open={editCategory.edit}>
            <DialogContent className="[&>button]:hidden">
              <DialogHeader>
                <DialogTitle>
                  <p className="text-center text-2xl">Update Category</p>
                  <DialogDescription className="text-center mt-2">
                    You Can Update Category Name And Image.
                  </DialogDescription>
                </DialogTitle>
                <UpdateCategory editCategory={editCategory} setEditCategory={setEditCategory}/>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button size="icon" className="size-8 bg-red-600 cursor-pointer hover:bg-red-500" onClick={()=>handleClickDelete(category._id)}>
            <Trash2 />
          </Button>
          <ConfirmDeleteDialog 
             open={editCategory.openConfirmDeleteDialog}
            itemName={"Category "}
            handleConfirmDelete={handleConfirmDeleteCategory}
            handleCancelDelete = {handleCancelDeleteCategory}
            isPending={false}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CategoryBody;
