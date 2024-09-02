"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <section
      className="relative bg-gray-500 bg-cover bg-center"
      style={{
        backgroundImage: `url("/bg.jpeg")`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="container relative z-20 min-h-[100vh] flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl font-bold">Welcome To My Website</h1>
        <p className="py-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro libero
          odit magni ipsum optio debitis eaque corporis nulla, eligendi ratione
          odio autem id! Molestias inventore facilis provident deleniti
          accusamus vitae laudantium consectetur atque quidem eos aspernatur
          velit architecto, dolorem a natus necessitatibus placeat aperiam
          laboriosam obcaecati? A ducimus incidunt sint!
        </p>
        {session ? (
          <button
            className="bg-red-700 py-2 px-6 text-white font-bold border-none outline-none rounded-md"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="py-2 px-6 bg-green-700 text-white font-bold border-none outline-none rounded-md"
          >
            Login
          </Link>
        )}
      </div>
    </section>
  );
};

export default Home;
