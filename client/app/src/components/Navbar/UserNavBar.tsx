import { NavLink } from "react-router-dom";
import flag from "../../assets/icon.png";
import profile from "../../assets/profileIcon.png";
import { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../context/UserContext";

const UserNavBar = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return -1;
  }
  const { user, setUser } = userContext;

  const [open, setOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClick = () => {
    handleOpen();
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-10 px-4 py-4 flex justify-between items-center bg-gray-800">
        <div className="cursor-pointer flex items-center gap-2">
          <img src={flag} alt="" className="w-8 h-8 rounded-xl" />
          <span className="hidden sm:flex font-manrope text-white font-[900]">
            KICK-INSIGHTS
          </span>
        </div>

        <div className="hidden lg:flex justify-between itmes-center gap-8">
          <NavLink
            to="/"
            className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 "
          >
            Matches
          </NavLink>
          <NavLink
            to="/"
            className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 "
          >
            Squad
          </NavLink>
          <NavLink
            to="/"
            className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 "
          >
            Top playes
          </NavLink>
          <NavLink
            to="/"
            className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 "
          >
            Statistics
          </NavLink>
        </div>

        <button
          className="relative w-9"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <img
            className={
              isProfileOpen
                ? "w-9 h-9 rounded-full border-4 border-gray-500"
                : "w-9 h-9 rounded-full"
            }
            src={user.isManager ? user.picture : profile}
          />
          {isProfileOpen && (
            <div className="font-manrope text-sm gap-1 text-white font-semibold flex flex-col items-start absolute top-12 right-0 bg-zinc-700 py-2 rounded-xl">
              <span className="px-6 hover:bg-zinc-500 w-full py-1 text-left">
                {user.username}
              </span>
              <span className="px-6 hover:bg-zinc-500 w-full py-1 text-left">
                Settings
              </span>
              <div className="w-full pt-1 border-t border-gray-500">
                <span className="flex hover:bg-zinc-500 px-6 py-1 text-left w-full">
                  Logout
                </span>
              </div>
            </div>
          )}
        </button>

        <div className="flex lg:hidden">
          {open ? (
            <IoMdClose
              onClick={handleClick}
              className="text-gray-500 text-3xl p-1 border border-gray-500 rounded-full"
            />
          ) : (
            <GiHamburgerMenu
              onClick={handleClick}
              className="text-gray-500 text-3xl p-2 border border-gray-500 rounded-full"
            />
          )}
        </div>

        {isSideBarOpen && (
          <div className="z-10 fixed top-20 flex flex-col justify-between itmes-start gap-8 lg:hidden">
            <NavLink
              to="/"
              className="hover:text-white font-manrope font-bold text-gray-500 "
            >
              Matches
            </NavLink>
            <NavLink
              to="/"
              className="hover:text-white font-manrope font-bold text-gray-500 "
            >
              Squad
            </NavLink>
            <NavLink
              to="/"
              className="hover:text-white font-manrope font-bold text-gray-500 "
            >
              Top playes
            </NavLink>
            <NavLink
              to="/"
              className="hover:text-white font-manrope font-bold text-gray-500 "
            >
              Statistics
            </NavLink>
          </div>
        )}
        {isSideBarOpen && (
          <div className="fixed bg-black bg-opacity-70 top-16 left-0 w-full h-screen backdrop-blur-md"></div>
        )}
      </div>
    </>
  );
};

export default UserNavBar;
