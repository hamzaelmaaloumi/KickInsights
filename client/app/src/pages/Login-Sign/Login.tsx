import { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import httpService from "../../HttpService/http-service";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

axios.defaults.withCredentials = true;

interface formData {
  username: string;
  password: string;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function Login() {
  const userContext = useContext(UserContext);
  if (userContext === undefined) {
    return -1;
  }
  const { user, setUser } = userContext;

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const onSubmit = async (data: formData) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/myapp/user/login/",
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.authenticated) {
        const token = res.data.jwt;
        document.cookie = `jwt=${token}; path=/; Secure; SameSite=None`;
        localStorage.setItem("token", token);

        setUser({
          id: res.data.user_id,
          username: res.data.username,
          picture: res.data.profile_picture,
          isLoggedIn: true,
          isManager: res.data.is_manager,
          isAdmin: false,
        });

        navigate("/"); // Redirect after successful login
      } else {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  console.log(user);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-black relative overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900 via-black to-black opacity-50"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600 blur-[120px] opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-600 blur-[120px] opacity-30"></div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 bg-black bg-opacity-50 border border-gray-800 shadow-lg shadow-indigo-500/30 backdrop-blur-xl rounded-2xl p-8 sm:p-12 md:w-1/2 lg:w-1/3 flex flex-col items-center"
        >
          <h2 className="pb-7 font-manrope font-bold text-4xl text-white tracking-wide drop-shadow-lg">
            Sign In to Kick-Insights
          </h2>

          <label className="w-full font-manrope font-semibold text-gray-300">
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-indigo-500 transition"
            type="text"
            placeholder="Enter your username"
          />
          {errors.username?.type === "required" && (
            <span className="w-full font-manrope font-medium text-red-500 text-sm">
              Username is required
            </span>
          )}

          <label className="mt-4 w-full font-manrope font-semibold text-gray-300">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-3 rounded-xl border border-gray-700 focus:ring-2 focus:ring-pink-500 transition"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password?.type === "required" && (
            <span className="w-full font-manrope font-medium text-red-500 text-sm">
              Password is required
            </span>
          )}
          {error && (
            <span className="w-full font-manrope font-medium text-red-500 text-sm">
              Invalid username or password
            </span>
          )}

          <button
            type="submit"
            className="mt-8 w-full py-3 rounded-xl font-manrope font-bold text-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-indigo-500/40 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>

          <span className="cursor-pointer mt-3 font-manrope font-medium text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/user-sign-up"
              className="hover:no-underline underline text-blue-400 hover:text-indigo-300 transition"
            >
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
