import { NavLink } from "react-router-dom";
import as from "../assets/ast.png";
import NavBar from "./Navbar/UserNavBar";
import Footer from "./Footer";

export default function NotFound() {
  return (
    <>
      <div className="my-9 md:my-0 flex flex-col md:flex-row justify-between px-1 md:px-9 lg:px-20 xl:px-32 items-center bg-black">
        <div className="w-2/2 flex flex-col justify-center items-center gap-6 text-white font-bold font-manrope">
          <span className="text-center text-7xl">404-ERROR</span>
          <span className="text-2xl">PAGE NOT FOUND</span>
          <NavLink
            to={"/"}
            className="text-center hover:bg-indigo-700 transition-all duration-300 border border-indigo-600 rounded-full p-2 w-3/5"
          >
            Back To Home
          </NavLink>
        </div>

        <div className="w-2/2 flex jutify-center items-center animate-bounce-up-down transition-all duration-300">
          <img src={as} alt="" />
        </div>
      </div>
    </>
  );
}
