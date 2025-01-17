import { IoArrowForwardOutline } from "react-icons/io5";




export default function Home() {
    return (
        
        
    <div className="flex flex-col">




        <div className="flex flex-col md:flex-row xl:justify-around justify-between items-center mt-20 px-8 lg:px-20 gap-1 lg:gap-2 mb-24">
            <div className="flex flex-col justify-between itmes-start md:w-3/4 lg:w-2/5 gap-10">
                <span className="font-manrope font-extrabold text-white text-6xl">Make <span className="bg-gradient-to-r from-pink-500 to-indigo-600">2025</span> the Year <span className="text-cyan-400">Your Master Coding</span></span>
                <span className="font-manrope font-semibold text-2xl text-white">Structured, no-fluff courses designed to give you practical skills and a clear path to success.</span>
                <button className="hover:w-4/6 transition-all duration-300 w-3/6 h-12 py-1 px-4 bg-purple-500 font-manrope font-semibold rounded-full flex justify-center items-center gap-1">Sign Up for Free <IoArrowForwardOutline color="black" /></button>
            </div>
            <div className="px-0 sm:px-8 py-8 border-t-[2px] border-slate-800 overflow-hidden w-full sm:w-1/2 lg:w-2/5">
                <code className="font-mono">
                    <div className="blink">
                        <span className="text-pink-500 mr-2">const</span>
                        <span className="text-white mr-2">coder</span>
                        <span className="text-pink-500 mr-2">=</span>
                        <span className="text-gray-400">{'{'}</span>
                    </div>
                    <div>
                        <span className="text-white ml-8 mr-2">name:</span>
                        <span className="text-gray-400">'</span>
                        <span className="text-amber-300">Master Coder</span>
                        <span className="text-gray-400">',</span>
                    </div>
                    <div>
                        <span className="text-white ml-8 mr-2">skills:</span>
                        <span className="text-gray-400">[</span>
                        <span className="text-amber-300">'React'</span>
                        <span className="text-gray-400">, '</span>
                        <span className="text-amber-300">Node</span>
                        <span className="text-gray-400">'],</span>
                    </div>
                    <div>
                        <span className="text-white ml-8 mr-2">hardWorker:</span>
                        <span className="text-orange-400">true</span>
                        <span className="text-gray-400">,</span>
                    </div>
                    <div>
                        <span className="text-white ml-8 mr-2">problemSolver:</span>
                        <span className="text-orange-400">true</span>
                        <span className="text-gray-400">,</span>
                    </div>
                    <div>
                        <span className="text-green-400 ml-8 mr-2">hireable:</span>
                        <span className="text-orange-400">function</span>
                        <span className="text-gray-400">() {'{'}</span>
                    </div>
                    <div>
                        <span className="text-orange-400 ml-16 mr-2">return</span>
                        <span className="text-gray-400">(</span>
                    </div>
                    <div>
                        <span className="text-cyan-400 ml-24">this.</span>
                        <span className="text-white mr-2">hardWorker</span>
                        <span className="text-amber-300">&amp;&amp;</span>
                    </div>
                    <div>
                        <span className="text-cyan-400 ml-24">this.</span>
                        <span className="text-white mr-2">problemSolver</span>
                        <span className="text-amber-300">&amp;&amp;</span>
                    </div>
                    <div>
                        <span className="text-cyan-400 ml-24">this.</span>
                        <span className="text-white mr-2">skills.length</span>
                        <span className="text-amber-300 mr-2">&gt;=</span>
                        <span className="text-orange-400">5</span>
                    </div>
                    <div>
                        <span className="text-gray-400 ml-16 mr-2">);</span>
                    </div>
                    <div>
                        <span className="text-gray-400 ml-8">{'}'}</span>
                    </div>
                    <div>
                        <span className="text-gray-400">{'}'}</span>
                    </div>
                </code>
            </div>
        </div>



        <div className="flex flex-col justify-between px-40">
            <span className="text-center font-manrope text-xl font-semibold bg-gradient-to-r from-pink-500 to-indigo-600 text-transparent bg-clip-text">
                Hello,
            </span>
            
            <span className="mt-8 text-center text-2xl font-manrope font-bold text-gray-400">I’ve spent 20+ years in software engineering, and my goal isn’t just to teach you to code — it’s to help you think like a professional software engineer, master problem-solving, and build skills you’ll use for life.</span>

        </div>




    </div>
    );
}