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
      <div className="flex justify-center items-center bg-gray-800">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 py-11 mx-1 px-4 sm:p-11 md:w-1/2 lg:w-1/3 bg-transparent border border-gray-100 rounded-xl flex flex-col justify-center items-center"
        >
          <h2 className="pb-7 font-manrope font-bold text-3xl text-white">
            Sign In to Kick-Insights
          </h2>
          <label
            htmlFor=""
            className="p-0 w-full font-manrope font-semibold text-gray-300"
          >
            Username
          </label>
          <input
            {...register("username", { required: true })}
            className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg"
            type="text"
            placeholder="enter your username"
          />
          {errors.username?.type === "required" && (
            <span className="p-0 w-full font-manrope font-medium text-red-500 text-sm">
              Username is required
            </span>
          )}
          <label
            htmlFor=""
            className="mt-4 p-0 w-full font-manrope font-semibold text-gray-300"
          >
            Password
          </label>
          <input
            {...register("password", { required: true })}
            className="placeholder:font-medium text-white outline-none font-manrope font-bold text-md bg-gray-900 my-2 w-full p-2 rounded-lg"
            type="password"
            placeholder="enter your password"
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
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-90 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-8 text-white font-manrope font-bold text-md bg-gray-900 w-full p-2 rounded-lg"
          >
            Login
          </button>
          <span className="cursor-pointer mt-2 font-manrope font-medium text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/user-sign-up"
              className="hover:no-underline underline text-blue-400"
            >
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
