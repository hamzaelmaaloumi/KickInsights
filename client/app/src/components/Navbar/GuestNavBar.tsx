import { NavLink } from 'react-router-dom';
import flag from '../../assets/icon.png'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function NavBar(){
    
    
    const [open, setOpen] = useState(false)
    const handleOpen = ()=> {
        setOpen(!open);
    }
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const handleClick = ()=>{
        handleOpen();
        setIsSideBarOpen(!isSideBarOpen);
    }


    return (<>
    <div className="sticky top-0 z-10 px-4 py-4 bg-inherit flex justify-between items-center">

        <div className="cursor-pointer flex items-center gap-2">
            <img src={flag} alt="" className='w-8 h-8 rounded-xl'/>
            <span className="hidden sm:flex font-manrope text-white font-[900]">KICK-INSIGHTS</span>
        </div>




        <div className="hidden lg:flex justify-between itmes-center gap-8">
            <NavLink to="/" className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 ">Matches</NavLink>
            <NavLink to="/" className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 ">Squad</NavLink>
            <NavLink to="/" className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 ">Top playes</NavLink>
            <NavLink to="/" className="transition-all duration-300 hover:text-white font-manrope font-bold text-gray-500 ">Statistics</NavLink>
        </div>
        


        <button className="hover:bg-gray-200 px-4 py-1 bg-white rounded-3xl font-manrope font-semibold text-black">Members Area</button>
        


        <div className="flex lg:hidden">
            {open ? <IoMdClose onClick={handleClick} className='text-gray-500 text-3xl p-1 border border-gray-500 rounded-full' /> : 
            <GiHamburgerMenu onClick={handleClick} className='text-gray-500 text-3xl p-2 border border-gray-500 rounded-full' /> }
        </div>


        {isSideBarOpen && <div className="z-10 fixed top-20 flex flex-col justify-between itmes-start gap-8 lg:hidden">
            <NavLink to="/" className="hover:text-white font-manrope font-bold text-gray-500 ">Matches</NavLink>
            <NavLink to="/" className="hover:text-white font-manrope font-bold text-gray-500 ">Squad</NavLink>
            <NavLink to="/" className="hover:text-white font-manrope font-bold text-gray-500 ">Top playes</NavLink>
            <NavLink to="/" className="hover:text-white font-manrope font-bold text-gray-500 ">Statistics</NavLink>
        </div>}
        {isSideBarOpen && <div className='fixed bg-black bg-opacity-70 top-16 left-0 w-full h-screen backdrop-blur-md'></div>} 
        
    </div>
    </>);
}    