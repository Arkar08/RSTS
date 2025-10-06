import ProductBody from "@/components/admin/ProductBody";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import PagePagination from "@/components/shared/PagePagination";
import TableHeading from "@/components/shared/TableHeading";
import { Table } from "@/components/ui/table";
import { useProduct } from "@/hooks/useProduct";
import { productHeader } from "@/utils/Dummy";
import { errorToastStyle } from "@/utils/Toast";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Product = () => {
  const navigate = useNavigate();
  const [productListings, setProductListings] = useState([]);
  const [produtPage, setProductPage] = useState(1);
  const [totalProduct, setTotalProduct] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const [searchData,setSearchData] = useState("")
  const { queryProduct, paginationProduct ,searchingProduct} = useProduct();
  const { data: product, isLoading, isError, error, isSuccess } = queryProduct;

  useEffect(() => {
    if (isSuccess && product) {
      setProductListings(product.data);
      setProductPage(product.currentPage);
      setProductTotal(product.totalItems);
      setTotalProduct(product.totalPages);
    }
  }, [isSuccess, product]);

  if (isError) {
    toast(error.message, errorToastStyle);
  }

  const CreateProduct = () => {
    setSearchData("")
    navigate("/admin/products/create");
  };

  const handleNextPageClick = async () => {
    setSearchData("")
    let nextPage;

    if (produtPage < totalProduct) {
      nextPage = produtPage + 1;
    } else {
      return;
    }

    const data = {
      page: nextPage,
    };
    try {
      const res = await paginationProduct.mutateAsync(data);
      if (res) {
        setProductListings(res.data);
        setProductPage(res.currentPage);
        setProductTotal(res.totalItems);
        setTotalProduct(res.totalPages);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.message, errorToastStyle);
    }
  };

  const handlePrevPageClick = async () => {
    setSearchData("")
    let prevPage;

    if (produtPage === 1) {
      return;
    } else {
      prevPage = produtPage - 1;
    }

    const data = {
      page: prevPage,
    };
    try {
      const res = await paginationProduct.mutateAsync(data);
      if (res) {
        setProductListings(res.data);
        setProductPage(res.currentPage);
        setProductTotal(res.totalItems);
        setTotalProduct(res.totalPages);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(error.message, errorToastStyle);
    }
  };

   const searchInput = async(event:ChangeEvent<HTMLInputElement>)=>{
      const searchData = event.target.value;
      setSearchData(searchData)
      try {
        if(searchData !== ''){
          const data = {
            search:searchData
          }
          const res = await searchingProduct.mutateAsync(data)
          if (res) {
            setProductListings(res);
          }
        }else{
          setProductListings(product.data);
          setProductPage(product.currentPage);
          setProductTotal(product.totalItems);
          setTotalProduct(product.totalPages);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast(error.message, errorToastStyle);
      }
    }
  

  return (
    <div>
      <Header title="Products" plusClick={CreateProduct} searchInput={searchInput} value={searchData}/>
      <div className="mt-2 h-[calc(100vh-240px)] overflow-auto border shadow-md rounded  ">
        <Table className="table-auto w-full">
          <TableHeading headers={productHeader} />
          {productListings.map((product, index) => {
            return <ProductBody product={product} key={index} setSearchData={setSearchData}/>;
          })}
        </Table>
        {(isLoading && !isError) && <Loading />}
        {productListings.length === 0 && !isLoading && (
          <div className="flex justify-center items-center mt-[150px]">
            <p className="text-xl">No Product found.</p>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between items-center mt-2 h-[60px] px-6 shadow-md border rounded">
        <div>
          <p>
            Total Listings -{" "}
            <span className="font-semibold">{productTotal}</span>{" "}
          </p>
        </div>
        <PagePagination
          currentPage={produtPage}
          handleNextPageClick={handleNextPageClick}
          handlePrevPageClick={handlePrevPageClick}
        />
      </div>
    </div>
  );
};

export default Product;
