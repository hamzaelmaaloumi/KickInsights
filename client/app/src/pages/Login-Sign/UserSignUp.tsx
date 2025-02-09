import { useEffect, useState } from "react"
import AOS from 'aos';
import "aos/dist/aos.css";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


interface formData {
    username: string;
    password: string;
}

export default function SignUp() {

    const [isChecked, setIsChecked] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [passAlert, setPassAlert] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setFocus} = useForm<formData>();

    useEffect(()=> {
        if(pass1 !== pass2){
            setPassAlert(true)
        }else{
            setPassAlert(false)
        }
    }, [pass2])

    const onSubmit = (data: formData)=>{
        const new_data = {...data, is_manager: false};
        axios.post('http://127.0.0.1:8000/myapp/user/create', new_data)
            .then(res => {
                console.log("success: "+res.data);
                navigate("/login")
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.data.error === 'user already exists') {
                        setError(true);
                        setErrorMsg("Username is already taken. Please choose another.");
                        setFocus("username")
                    } else {
                        setError(true);
                        setErrorMsg("Something went wrong. Please try again later.");
                    }
                } else {
                    setError(true);
                    setErrorMsg("Something went wrong. Please try again later.");
                }
                setTimeout(() => setError(false), 7000);
            });
    }



    return (<>
    <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="my-4 py-11 mx-1 px-4 sm:p-11 md:w-1/2 lg:w-1/3 bg-transparent border border-gray-800 rounded-xl flex flex-col justify-center items-center">
            <h2 className="pb-7 font-manrope font-bold text-3xl text-white">Sign Up to Kick-Insights</h2>
            <input {...register('username', {required: true})} className="text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="text" placeholder="Username"/>
            <input {...register('password', { required: true, minLength: 8 })}
                onChange={(e) => {
                    setPass1(e.target.value); 
                    register('password').onChange(e); 
                }} 
                className="text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="password" placeholder="Password"/>
            <input onChange={(e) => setPass2(e.target.value)} className="text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="password" placeholder="Confirm Password"/>
            {passAlert && <span className="w-full font-manrope font-medium text-red-500 text-sm">Passwords do not match</span>}
            {errors.password?.type === 'minLength' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Password must be at least 8 characters</span>}
            {error && <span className="w-full font-manrope font-medium text-red-500 text-sm">{errorMsg}</span>}
            <div className="mt-2 flex justify-start items-center cursor-pointer w-full">
                <input onChange={(e) => setIsChecked(e.target.checked)} className="mr-2" type="checkbox"/>
                <span className="font-manrope font-medium text-sm text-gray-400">i agree with <span className="hover:no-underline underline text-blue-400">terms and conditions</span></span>
            </div>

            <button type="submit" className="disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-90 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-11 text-white font-manrope font-bold text-md bg-gray-900 w-full p-2 rounded-lg" disabled={!isChecked}>Sign Up</button>
            <Link to={"/manager-sign-up"} className="hover:bg-gray-950 bg-transparent mt-2 border-2 border-gray-700 text-white text-center font-manrope font-bold text-md  w-full p-2 rounded-lg" >Sign up as Manager</Link>
            <span className="cursor-pointer mt-2 font-manrope font-medium text-sm text-gray-400">Already have an account? <Link to="/login" className="hover:no-underline underline text-blue-400">Log in</Link></span>
        </form>
    
    </div>
    
    </>)
}