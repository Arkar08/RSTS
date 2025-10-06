import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrendingCard = ({product}:any) => {

  const navigate = useNavigate()

  const detailPage = (id:string) => {
    navigate(`/collection/${id}`)
  }

  return (
    <Card className="h-[380px] w-[250px] p-1 relative">
      <CardHeader className="p-0 m-0">
        <img
          src={product?.images[0]}
          alt="cardImage"
          className="w-full h-[200px] object-cover rounded-md shadow"
        />
      </CardHeader>
      <CardContent className="px-2 py-0 m-0">
        <p className="text-center text-sm">{product.name}</p>
        <p className="text-center font-semibold text-gray-600 text-sm pt-1">$ {product.price} AUD</p>
      </CardContent>
      <CardFooter className="px-2 absolute w-full  mx-auto bottom-2">
        {
          product.quantity === 0 ? (
            <div className="pl-12">
              <p className="text-center text-xl font-bold text-orange-500">Out Of Stock</p>
            </div>
          ):(
            <Button className="cursor-pointer" onClick={()=>detailPage(product._id)}>See More</Button>
          )
        }
      </CardFooter>
    </Card>
  );
};

export default TrendingCard;
