import { Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { TableBody, TableCell, TableRow } from "../ui/table";
import type { AdvertisingProps } from "@/utils/Constant";
import { useState } from "react";
import { ConfirmDeleteDialog } from "../shared/ComfirmDelete";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/Toast";
import { useAdvertising } from "@/hooks/useAdvertising";

interface advertising {
  advertising: AdvertisingProps;
}

const AdvertisingBody = ({ advertising }: advertising) => {
  const [deleteConfirmAdvertising, setDeleteConfirmAdvertising] = useState({
    deleteId: "",
    delete: false,
  });
  const navigate = useNavigate()
  const {deleteAdvertising} = useAdvertising()

  const handleClickDelete = (id: string) => {
    setDeleteConfirmAdvertising((prev) => {
      return {
        ...prev,
        delete: true,
        deleteId: id,
      };
    });
  };

  const handleDeleteAdvertising = async () => {
    try {
      const res = await deleteAdvertising.mutateAsync(deleteConfirmAdvertising.deleteId);
      if (res.status === 200) {
        toast(`${res.message}`, successToastStyle);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.message}`, errorToastStyle);
    } finally {
      setDeleteConfirmAdvertising((prev) => {
        return {
          ...prev,
          delete: false,
          deleteId: "",
        };
      });
    }
  };

  const handleCancelDeleteAdvertising = () => {
    setDeleteConfirmAdvertising((prev) => {
      return {
        ...prev,
        delete: false,
        deleteId: "",
      };
    });
  };

    const updateAdvertising = (id:string) => {
        navigate(`/admin/advertising/${id}`)
    }

  return (
    <TableBody>
      <TableRow>
        <TableCell className="text-center">
          <p style={{ fontSize: 16 }} className="capitalize">
            {advertising._id}
          </p>
        </TableCell>
        <TableCell className="max-w-xs break-words whitespace-pre-wrap">
          <p className="text-sm text-gray-700 text-center">
            {advertising.title}
          </p>
        </TableCell>
        <TableCell className="flex gap-2 justify-center mt-2">
          <Button
            size="icon"
            className="size-8 bg-blue-600 cursor-pointer hover:bg-blue-500"
            onClick={()=>updateAdvertising(advertising._id)}
          >
            <Edit2 />
          </Button>
          <Button
            size="icon"
            className="size-8 bg-red-600 cursor-pointer hover:bg-red-500"
            onClick={() => handleClickDelete(advertising._id)}
          >
            <Trash2 />
          </Button>
          <ConfirmDeleteDialog
            open={deleteConfirmAdvertising.delete}
            itemName={"Advertising "}
            handleConfirmDelete={handleDeleteAdvertising}
            handleCancelDelete={handleCancelDeleteAdvertising}
            isPending={false}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default AdvertisingBody;
