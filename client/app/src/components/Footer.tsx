import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center sm:px-10 md:px-20 lg:px-32 py-14 border-t border-gray-800 bg-black">
        <span className="transition-all duration-300 hover:text-white cursor-pointer font-manrope font-semibold text-gray-500 text-md">
          © Kick-Insights
        </span>

        <div className="flex items-center gap-4">
          <FaWhatsappSquare
            size={24}
            className=" transition-all duration-300 hover:text-white text-gray-500 text-lg"
          />
          <FaInstagramSquare
            size={24}
            className=" transition-all duration-300 hover:text-white text-gray-500 text-lg"
          />
          <FaFacebookSquare
            size={24}
            className=" transition-all duration-300 hover:text-white text-gray-500 text-lg"
          />
        </div>

        <div className="flex items-center gap-5">
          <span className="font-manrope font-semibold transition-all duration-300 hover:text-white cursor-pointer text-gray-500 text-md">
            Terms of Use
          </span>
          <span className="font-manrope font-semibold transition-all duration-300 hover:text-white cursor-pointer text-gray-500 text-md">
            Contact
          </span>
        </div>
      </div>
    </>
  );
}
