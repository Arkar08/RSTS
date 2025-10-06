import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductListings = ({ product }: any) => {
  const navigate = useNavigate();

  const productDetailClick = (id: string) => {
    navigate(`/collection/${id}`);
  };

  return (
    <Card className="h-[380px] w-[250px] p-1 relative">
      <CardHeader className="p-0 m-0">
        <img
          src={product.images[0]}
          alt="cardImage"
          className="w-full h-[200px] object-cover rounded-md"
        />
      </CardHeader>
      <CardContent className="px-2 py-0 m-0">
        <p className="text-center text-sm font-bold">{product.name}</p>
        <div className="text-center pt-1">
          {product.customerSalePrice > 0 ? (
            <div>
              <span
                style={{
                  color: "orangered",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                $ {product?.customerSalePrice} AUD
              </span>{" "}
              <span
                style={{
                  textDecoration: "line-through",
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                $ {product.price} AUD
              </span>
            </div>
          ) : (
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              $ {product.price} AUD
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-2 absolute bottom-2 flex justify-center items-center right-0.5 w-full">
        {
          product.quantity === 0 ? (
            <p className="text-center text-xl font-bold text-orange-500">Out Of Stock</p>
          ):(
            <Button
          className="cursor-pointer w-full"
          onClick={() => productDetailClick(product._id)}
        >
          See More
        </Button>
          )
         }
      </CardFooter>
    </Card>
  );
};

export default ProductListings;
