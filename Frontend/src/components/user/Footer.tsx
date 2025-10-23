import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-black p-4 flex md:flex-row flex-col sm:flex-col lg:flex-row justify-around items-center">
        <div className="my-2">
          <h3 className="text-white text-xl">RSTS Vintage Shop</h3>
          <p className="text-gray-500 pt-2">Retro Style Timeless Soul</p>
          <p className="text-white pt-2 text-center">Since 2014</p>
        </div>
        <div className="mt-4 grid md:grid-cols-4 lg:grid-cols-4 grid-cols-2 gap-6">
          <div>
            <h3 className="text-white text-xl pb-4 text-nowrap">Quick Links</h3>
            <div className="flex flex-col">
              <Link to="/" className="text-gray-400 text-sm py-1">
                Home
              </Link>
              <Link to="/collection" className="text-gray-400 text-sm py-1">
                Collections
              </Link>
              <Link to="/contact" className="text-gray-400 text-sm py-1">
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl pb-4">Company</h3>
            <div className="flex flex-col">
              <Link
                to="/product-disclaimer"
                className="text-gray-400 text-sm py-1 text-nowrap"
              >
                Product Disclaimer
              </Link>
              <Link to="/return-policy" className="text-gray-400 text-sm py-1">
                Return Policy
              </Link>
              <Link to="/privacy-policy" className="text-gray-400 text-sm py-1">
                Privacy Policy
              </Link>
              <Link
                to="/shipping-policy"
                className="text-gray-400 text-sm py-1"
              >
                Shipping Policy
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white text-xl text-nowrap">Follow us</h3>
            <p className="text-gray-400 text-sm py-1 pt-4">We accept</p>
            <p className="text-gray-400 text-sm py-1">Visa Master</p>
            <p className="text-gray-400 text-sm py-1">Paypal</p>
          </div>
          <div>
            <h3 className="text-white text-xl text-nowrap">Contact us</h3>
            <div className="text-gray-400  mt-4">
              <h3 className="font-bold pb-2">Shop1</h3>
              <p className="text-sm text-gray-400">Mount Gravatt Sunday Market</p>
              <p className="text-sm text-gray-400">Trash and Treasure</p>
              <p className="text-sm text-gray-400">1644 Logan Rd</p>
              <p className="text-sm text-gray-400">Mt Gravatt, 4122</p>
              <p className="text-sm text-gray-400">QLD</p>
            </div>
            <div className="mt-2 flex gap-3">
              <a href="https://www.tiktok.com/@rstsmm?_t=ZS-90ivYWzqCuY&_r=1">
                <img
                  src="tiktok.png"
                  alt="tiktokImage"
                  className="w-[30px] h-[30px] bg-white rounded-full"
                />
              </a>
              <a href="https://ebay.us/m/h3jD5y">
                <img
                  src="ebay.png"
                  alt="ebay"
                  className="w-[30px] h-[30px] bg-white rounded-full"
                />
              </a>
              <a href="https://www.facebook.com/share/17XZeCWg1Q/?mibextid=wwXIfr">
                <img
                  src="facebook.png"
                  alt="facebook"
                  className="w-[30px] h-[30px] bg-white rounded-full"
                />
              </a>
              <a href="https://teams.live.com/l/message/19:29269030e9d9fb22d05f7f018736ac5debbf91358db118439cbef44fa09f8347@oneToOne.skype/1761202292999?context=%7B%22contextType%22%3A%22chat%22%7D">
                <img
                  src="social.png"
                  alt="social"
                  className="w-[30px] h-[30px] bg-white rounded-full"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800">
        <p className="text-center text-gray-400 text-sm">
          @2025, Developed by Arkar
        </p>
      </div>
    </>
  );
};

export default Footer;
