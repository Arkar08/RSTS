import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivacyPolicy = () => {

  const {pathname} = useLocation()

  useLayoutEffect(()=>{
    window.scrollTo(0,0)
  },[pathname])

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-center">Privacy Policy</h3>
      <p className="text-center mt-1">
        Your privacy is important to us. We are committed to protecting your
        personal information in accordance with the Privacy Act 1988 (Cth).
      </p>
      <div className="mt-2">
        <h3 className="text-xl font-semibold">What We Collect</h3>
        <h4 className="pl-4 py-2">
          We may collect personal information such as:
        </h4>
        <ul className="pl-12">
          <li style={{ listStyle: "initial" }}>
            Your name and contact details
          </li>
          <li style={{ listStyle: "initial" }}>Shipping and billing address</li>
          <li style={{ listStyle: "initial" }}>Email address</li>
          <li style={{ listStyle: "initial" }}>
            Purchase history or communication with us
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <h3 className="text-xl font-semibold">How We Use Your Information</h3>
        <h4 className="pl-4 py-2">We collect this information to:</h4>
        <ul className="pl-12">
          <li style={{ listStyle: "initial" }}>Process and ship your orders</li>
          <li style={{ listStyle: "initial" }}>
            Communicate with you about your purchase
          </li>
          <li style={{ listStyle: "initial" }}>
            Improve our products and services
          </li>
          <li style={{ listStyle: "initial" }}>
            Comply with legal obligations
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <p className="pl-4">
          We do not sell, rent, or share your personal information with third
          parties except where necessary to process your order (e.g. shipping
          carriers or payment processors)
        </p>
      </div>
      <div className="mt-2">
        <h3 className="text-xl font-semibold">Data Security</h3>
        <p className="pl-4">
          We take reasonable steps to protect your data from misuse, loss,
          unauthorised access, or disclosure.
        </p>
      </div>
      <div className="mt-2">
        <h3 className="text-xl font-semibold">Access & Correction</h3>
        <p className="pl-4">
          You may request access to your personal information at any time and
          ask us to correct it if it is inaccurate.
        </p>
      </div>
      <div className="mt-2">
        <h3 className="text-xl font-semibold">Contact Us</h3>
        <p className="pl-4">
          If you have any privacy concerns or questions, please contact us
          directly at [your email address].
        </p>
      </div>
      <div className="mt-4">
        <div className="w-[100px] h-[2px] bg-black"></div>
      </div>
      <div className="mt-2">
        <h3 className="text-xl font-semibold">Terms of Service</h3>
        <p className="pl-4">
          By purchasing from our store, you agree to the following terms and
          conditions:
        </p>
        <div className="pl-6 py-2">
          <p className="font-semibold">1. Products</p>
          <p className="mt-2 pl-2">
            All items are second-hand, vintage, or pre-owned, and are sold
            as-is. We make every effort to describe items accurately and include
            clear photographs.
          </p>
          <p className="font-semibold mt-2">2. Pricing & Payment</p>
          <p className="mt-2 pl-2">
            All prices are in Australian Dollars (AUD). Payment must be received
            in full before we ship any items.
          </p>
          <p className="font-semibold mt-2">3. Shipping</p>
          <p className="mt-2 pl-2">
            We offer free shipping within Australia via Australia Post. Local
            pickup or free delivery within 10km may be available for certain
            items. We are not responsible for postal delays once an item has
            been dispatched.
          </p>
          <p className="font-semibold mt-2">4. Returns</p>
          <p className="mt-2 pl-2">
            All sales are generally final, as per our return policy. We do not
            accept returns for change of mind. If an item arrives significantly
            not as described, please contact us within 3 days of delivery.
          </p>
          <p className="font-semibold mt-2">5. Limitation of Liability</p>
          <p className="mt-2 pl-2">
            We are not liable for any indirect or consequential loss arising
            from the use of our products or services. Our liability is limited
            to the value of the item purchased, as permitted under Australian
            Consumer Law.
          </p>
          <p className="font-semibold mt-2">6. Changes</p>
          <p className="mt-2 pl-2">
            We may update these policies from time to time. Changes will take
            effect immediately upon posting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
