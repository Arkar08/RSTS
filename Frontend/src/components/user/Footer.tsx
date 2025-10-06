import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className="w-full bg-black p-4 flex md:flex-row flex-col sm:flex-col lg:flex-row justify-around items-center">
      <div className="my-2">
        <h3 className="text-white text-xl">RSTS Vintage Shop</h3>
        <p className="text-gray-500 pt-2">Retro Style Timeless Soul</p>
      </div>
      <div className="flex gap-6 mt-4">
        <div>
          <h3 className="text-white text-xl pb-4 text-nowrap">Quick Links</h3>
          <div className="flex flex-col">
            <Link to='/' className="text-gray-400 text-sm py-1">Home</Link>
            <Link to='/collection' className="text-gray-400 text-sm py-1">Collections</Link>
            <Link to='/contact' className="text-gray-400 text-sm py-1">Contact Us</Link>
          </div>
        </div>
        <div>
          <h3 className="text-white text-xl pb-4">Company</h3>
          <div className="flex flex-col">
              <Link to='/product-disclaimer' className="text-gray-400 text-sm py-1 text-nowrap">Product Disclaimer</Link>
              <Link to='/return-policy' className="text-gray-400 text-sm py-1">Return Policy</Link>
              <Link to='/privacy-policy' className="text-gray-400 text-sm py-1">Privacy Policy</Link>
              <Link to='/shipping-policy' className="text-gray-400 text-sm py-1">Shipping Policy</Link>
          </div>
        </div>
        <div>
          <h3 className="text-white text-xl text-nowrap">Follow us</h3>
          <p className="text-gray-400 text-sm py-1 pt-4">We accept</p>
          <p className="text-gray-400 text-sm py-1">Visa Master</p>
          <p className="text-gray-400 text-sm py-1">Paypal</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;
