"use client";

import useForm from "@/hooks/useForm";
import { UserInfo } from "@/types";
import { LockKeyhole, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const { values, handleChange, reset } = useForm(userInfo);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      return setError("please all complate sections");
    }

    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        return setError(res.error);
      }

      if (res?.status === 200) {
        reset();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container pt-20">
      <h1 className="text-center mb-4 text-3xl font-medium">Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="relative text-gray-500 focus-within:text-gray-900 mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <Mail className=" stroke-current ml-1" />
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="relative text-gray-500 focus-within:text-gray-900 mb-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <LockKeyhole className="stroke-current ml-1" />
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>

        {error && <p className="mt-2 text-red-600 pl-2">{error}</p>}

        <div className="flex mt-7 mb-5">
          <button className="w-full h-12 bg-indigo-600 hover:bg-indigo-900 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">
            LOGIN
          </button>
        </div>
      </form>

      <p className="text-right text-slate-600 font-medium">
        Dont have an account
        <Link href={"/signup"} className="text-blue-500">
          sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
