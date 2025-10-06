import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";


const ShippingPolicy = () => {

  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="p-4 md:h-[calc(100vh-265px)] sm:h-[100vh]">
      <h3 className="text-2xl font-bold text-center">Shipping Policy (Australia Only)</h3>
      <p className="text-center mt-1">
        We aim to get your item to you quickly, safely, and at no extra cost.
      </p>
      <div className="mt-2">
        <h4 className="pl-4 py-2 font-semibold">
          Shipping Details:
        </h4>
        <ul className="pl-12">
          {/* <li style={{ listStyle: "initial" }}>
            We offer FREE shipping Australia-wide via Australia Post.
          </li> */}
          <li style={{ listStyle: "initial" }}>Orders are dispatched within 1 business day and typically delivered within 2 business days, depending on your location.</li>
          <li style={{ listStyle: "initial" }}>
            A tracking number will be provided once your item has shipped.
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <h4 className="pl-4 py-2 font-semibold">
            Local Pickup & Delivery (within 10km):
        </h4>
        <ul className="pl-12">
          <li style={{ listStyle: "initial" }}>
            Local pickup is available by appointment. Please contact us after purchase to arrange a time.
          </li>
          <li style={{ listStyle: "initial" }}>We also offer free door-to-door delivery within 10km of our location for eligible items. Please check with us prior to purchase to confirm availability.</li>
        </ul>
      </div>
      <div className="mt-2">
        <h4 className="pl-4 py-2 font-semibold">
            Additional Info:
        </h4>
        <ul className="pl-12">
          <li style={{ listStyle: "initial" }}>
            All items are securely packaged using recycled or sustainable materials wherever possible.
          </li>
          <li style={{ listStyle: "initial" }}>We are not responsible for postal delays once the item has been dispatched, but we’ll always do our best to assist you if issues arise.</li>
        </ul>
        <p className="mt-1 pl-4">
          Thank you for supporting our small, second-hand business!
        </p>
      </div>
    </div>
  )
}

export default ShippingPolicy;
