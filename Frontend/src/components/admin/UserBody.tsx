import type { UserProps } from "@/utils/Constant";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useMutateUser } from "@/hooks/useUser";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { toast } from "sonner";

interface User{
    user:UserProps,
}

const UserBody = ({user}:User) => {

    const {changeUserStatus} = useMutateUser({id:user._id})

    const handleOnClick = async(id:string,isActive:boolean) => {
        const data = {
            id:id,
            isActive:!isActive
        }
        try {
            const res = await changeUserStatus.mutateAsync(data)
            if(res.message === 'Active User Successfully.'){
                toast(`${res.message}`, successToastStyle);
            }else{
                toast(`${res.message}`, errorToastStyle);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast(`${error.response.data.message}`, errorToastStyle);
        }
    }

  return (
    <TableBody>
      <TableRow>
         <TableCell className="text-center">
            <p style={{fontSize:16}} className="capitalize">{user.name}</p>
        </TableCell>
         <TableCell className="text-center">
            <p style={{fontSize:16}}>{user.email}</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}}>{user.phoneNumber}</p>
        </TableCell>
        <TableCell className="text-center">
            <p style={{fontSize:16}} className="capitalize">{user.role}</p>
        </TableCell>
        <TableCell className="flex gap-2 justify-center mt-2">
           <div className="cursor-pointer" onClick={()=> handleOnClick(user._id,user.isActive)}>
                {
                    user.isActive ? <ToggleRight color="green" className="w-[30px] h-[30px]"/> : <ToggleLeft color="red" className="w-[30px] h-[30px]"/>
                }
           </div>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default UserBody
