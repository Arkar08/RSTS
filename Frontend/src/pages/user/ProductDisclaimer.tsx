import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductDisclaimer = () => {

  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="p-4 h-[calc(100vh-264px)]">
      <div className="font-bold text-2xl py-8 flex flex-col sm:flex-col md:flex-row lg:flex-row justify-center items-center">
        <p className="whitespace-nowrap">Product Disclamier - </p>
        <p className="whitespace-nowrap">Second-Hand Goods</p>
      </div>
      <div className="mx-auto max-w-[500px] text-wrap">
        <p className="mt-2">
          Please note that all items listed are pre-owned (second-hand) and may
          show signs of age, wear, or previous use.
        </p>
        <p className="mt-2">
          {" "}
          Descriptions, measurements, and photos are provided in good faith and
          to the best of our ability.
        </p>
        <p className="mt-2">
          All items are sold as-is, and no warranties or guarantees are
          provided.{" "}
        </p>
        <p className="mt-2">
          Your understanding is appreciated when buying vintage or second-hand
          goods.
        </p>
      </div>
    </div>
  );
};

export default ProductDisclaimer;
