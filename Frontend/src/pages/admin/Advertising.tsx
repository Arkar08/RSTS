import AdvertisingBody from "@/components/admin/AdvertisingBody";
import Loading from "@/components/shared/Loading";
import TableHeading from "@/components/shared/TableHeading";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { useAdvertising } from "@/hooks/useAdvertising";
import type { AdvertisingProps } from "@/utils/Constant";
import { advertisingHeader } from "@/utils/Dummy";
import { errorToastStyle } from "@/utils/Toast";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Advertising = () => {
  const navigate = useNavigate();
  const { queryAdvertising } = useAdvertising();
  const { data: advertising, isLoading, isSuccess, isError, error } = queryAdvertising;
  const [advertisingList, setAdvertisingList] = useState<AdvertisingProps[]>(
    []
  );
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (isSuccess && advertising) {
      setAdvertisingList(advertising.data);
      setTotalItems(advertising.totalItems);
    }
  }, [isSuccess, advertising]);

  if (isError) {
    toast(error.message, errorToastStyle);
  }

  const plusClick = () => {
    navigate("/admin/advertising/create");
  };

  return (
    <div>
      <div className="h-[60px] border-2 rounded-md flex justify-between items-center px-4 shadow-md">
        <h3 className="text-xl">Advertising</h3>
        <Button
          size="icon"
          className="size-9 cursor-pointer hover:opacity-80"
          onClick={plusClick}
        >
          <Plus />
        </Button>
      </div>
      <div className="mt-2 h-[calc(100vh-240px)] overflow-auto border shadow-md rounded">
        <Table className="table-auto w-full">
          <TableHeading headers={advertisingHeader} />
          {advertisingList?.map((advertising, index) => {
            return <AdvertisingBody advertising={advertising} key={index} />;
          })}
        </Table>
        {isLoading && !isError && <Loading />}
        {advertisingList.length === 0 && !isLoading && (
          <div className="flex justify-center items-center mt-[150px]">
            <p className="text-xl">No Advertising found.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center mt-2 h-[60px] px-6 shadow-md border rounded">
        <div>
          <p>
            Total Listings - <span className="font-semibold">{totalItems}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Advertising;
