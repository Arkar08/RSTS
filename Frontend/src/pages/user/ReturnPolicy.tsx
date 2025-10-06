import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ReturnPolicy = () => {


  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="p-4 md:h-[calc(100vh-265px)] sm:h-[100vh]">
      <h3 className="text-2xl font-bold text-center">Return Policy</h3>
      <p className="text-center mt-1">
        All items in our shop are pre-owned, vintage, or second-hand, and are sold as-is. We do our best to describe each item accurately and provide clear photos to help you make an informed decision.
      </p>
      <div className="mt-2">
        <h4 className="pl-4 py-2 font-semibold">
          Please Note:
        </h4>
        <ul className="pl-12">
          <li style={{ listStyle: "initial" }}>
            Due to the nature of second-hand goods, we generally do not accept returns, exchanges, or cancellations.
          </li>
          <li style={{ listStyle: "initial" }}>All sales are considered final.</li>
        </ul>
        <p className="mt-1 pl-4">
          However, if there is a significant issue not described in the listing (e.g. undisclosed damage or wrong item received), please contact us within 3 days of delivery. We will do our best to resolve the issue fairly and promptly.
        </p>
      </div>
      <div className="mt-2">
        <h4 className="pl-4 py-2 font-semibold">
          We encourage buyers to:
        </h4>
        <ul className="pl-12">
          <li style={{ listStyle: "initial" }}>
            Review all photos carefully
          </li>
          <li style={{ listStyle: "initial" }}>Read the full item description</li>
          <li style={{ listStyle: "initial" }}>Ask any questions before purchasing</li>
        </ul>
        <p className="mt-1 pl-4">
          Your satisfaction is important, and we want you to feel confident in your purchase. Thank you for supporting sustainable, second-hand shopping!
        </p>
      </div>
    </div>
  )
}

export default ReturnPolicy;
