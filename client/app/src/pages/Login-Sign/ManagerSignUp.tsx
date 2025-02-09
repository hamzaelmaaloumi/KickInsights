import { useEffect, useRef, useState } from "react";
import PictureInput from "../../components/PictureInput";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormData{
    username: string;
    phone_number: string;
    password: string;
    birthday: string;
    nationality: string;
    profile_picture: FileList;
}

export default function ManagerSignUp(){
    useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

    const [isChecked, setIsChecked] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [userError, setUserError] = useState(false);
    const [userErrorMsg, setUserErrorMsg] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [passAlert, setPassAlert] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setFocus} = useForm<FormData>();

    useEffect(()=> {
        if(pass1 != pass2){
            setPassAlert(true);
        }else{
            setPassAlert(false)
        }
    },[pass2])

    const onSubmit = (data: FormData) => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('phone_number', data.phone_number);
        formData.append('birthday', data.birthday);
        formData.append('nationality', data.nationality);
        formData.append('is_manager', 'true');
    
        // Add this line to properly handle file
        if (data.profile_picture[0]) {
            formData.append('profile_picture', data.profile_picture[0]);
        }
        axios.post('http://127.0.0.1:8000/myapp/user/create', formData)
            .then(res => {
                console.log("success: "+res.data);
                navigate("/login")
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.data.error === 'user already exists') {
                        setUserError(true);
                        setUserErrorMsg("Username is already taken. Please choose another.");
                        setFocus("username")
                    } else {
                        setError(true);
                        setErrorMsg("Something went wrong. Please try again later.");
                    }
                } else {
                    setError(true);
                    setErrorMsg("Something went wrong. Please try again later.");
                }
                setTimeout(() => setError(false), 3000);
                setTimeout(() => setUserError(false), 7000);
            });
    }




    return (<>
    <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="my-14 py-11 px-4 sm:px-11 mx-2 sm:mx-0 w-full sm:w-5/6 md:w-4/6 lg:w-1/2 bg-transparent border border-gray-800 rounded-xl flex flex-col justify-center items-center">
            
            <h2 className="font-manrope font-bold text-indigo-500 text-3xl border-b border-gray-400 w-full pb-8">Create Your Manager Account</h2>
            <div className="flex sm:flex-row flex-col justify-between gap-2 mt-8 w-full">
                <div className="flex w-full sm:w-1/2 flex-col jutify-center items-start">
                    <label htmlFor="" className="font-manrope font-semibold text-gray-300">Username</label>
                    <input {...register('username', {required: true})} className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="text" placeholder="Enter your username"/>
                    {errors.username?.type === 'required' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Username is required</span>}
                    {userError && <span className="w-full font-manrope font-medium text-red-500 text-sm">{userErrorMsg}</span>}
                </div>
                <div className="flex w-full sm:w-1/2 flex-col jutify-center items-start">
                    <label htmlFor="" className="font-manrope font-semibold text-gray-300">Phone Number</label>
                    <input {...register('phone_number', {required: true, pattern:/^(?:\+212|0)([5-7])[0-9]{8}$/  })} className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="tel" placeholder="Enter your phone number" title="Enter a valid phone number" />
                    {errors.phone_number?.type === 'required' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Phone number is required</span>}
                    {errors.phone_number?.type === 'pattern' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Phone number is not valid</span>}
                </div>
            </div> 

            <div className="mt-4 flex sm:flex-row flex-col justify-between gap-4 w-full">
                <div className="flex w-full sm:w-1/2 flex-col jutify-center items-start">
                    <label htmlFor="" className="font-manrope font-semibold text-gray-300">Password</label>
                    <input {...register('password', {required: true, minLength: 8}) }
                        onChange={(e) => {
                            setPass1(e.target.value); 
                            register('password').onChange(e); 
                        }} 
                    className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="text" placeholder="Enter your password"/>
                    {errors.password?.type === 'required' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Password is required</span>}
                    {errors.password?.type === 'minLength' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Password must be at least 8 characters</span>}
                    {passAlert && <span className="w-full font-manrope font-medium text-red-500 text-sm">Passwords do not match</span>}
                </div>
                <div className="flex w-full sm:w-1/2 flex-col jutify-center items-start">
                    <label htmlFor="" className="font-manrope font-semibold text-gray-300">Confirm Password</label>
                    <input onChange={e => setPass2(e.target.value)} className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="text" placeholder="Confirm your password"/>
                </div>
            </div>

            <div className="mt-4 flex sm:flex-row flex-col justify-between gap-4 w-full">
                <div className="flex w-full sm:w-1/2 flex-col jutify-center items-start">
                    <label htmlFor="" className="font-manrope font-semibold text-gray-300">Date of Birth</label>
                    <input {...register('birthday', {required: true})} className="placeholder:font-medium text-gray-400 outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" type="date" placeholder="Birthday"/>
                    {errors.birthday?.type === 'required' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Date of birth is required</span>}
                </div>
                <div className="flex w-full sm:w-1/2 flex-col jutify-center items-start">
                    <label htmlFor="" className="font-manrope font-semibold text-gray-300">Nationality</label>
                    <select {...register('nationality', {required: true})} className="placeholder:font-medium text-gray-400 outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg" name="" id="">
                        <option value="morocco">Morocco</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="Lebanon">Lebanon</option>
                        <option value="Syria">Syria</option>
                        <option value="Palestine">Palestine</option>
                    </select>
                    {errors.nationality?.type === 'required' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Nationality is required</span>}
                </div>
            </div>

            <div className="mt-4 flex flex-col justify-center w-full">
                <div className="flex flex-col jutify-center items-start">
                    <label htmlFor="" className="mb-2 font-manrope font-semibold text-gray-300">Profile Picture</label>
                    <PictureInput registration={register('profile_picture', {required: true})} />
                </div>
                {errors.profile_picture?.type === 'required' && <span className="w-full font-manrope font-medium text-red-500 text-sm">Profile picture is required</span>}
                {errorMsg && <span className="w-full font-manrope font-medium text-red-500 text-sm">{errorMsg}</span>}    
            </div>

            <div className="mt-2 flex justify-start items-center cursor-pointer w-full">
                <input onChange={(e) => setIsChecked(e.target.checked)} className="mr-2" type="checkbox"/>
                <span className="font-manrope font-medium text-sm text-gray-400">i agree with <span className="hover:no-underline underline text-blue-400">terms and conditions</span></span>
            </div>


            <button type="submit" className="disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-90 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-11 text-white font-manrope font-bold text-md bg-gray-900 w-full p-2 rounded-lg" disabled={!isChecked}>Register</button>
            

        </form>
    </div>
    </>)
}