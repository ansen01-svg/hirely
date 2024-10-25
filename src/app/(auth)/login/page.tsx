"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/app/actions/login";
import { googleLoginAction } from "@/app/actions/google_login";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const res = await login({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      console.log(res);

      if (res?.error) {
        setError(res.error as string);
      }

      if (res?.ok) {
        console.log("success");
        return router.push("/");
      }
    } catch (error) {
      console.error("login error-", error);
    }
  };

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-[400px]">
        <h1 className="mb-5 w-full text-2xl font-bold">Sign In</h1>
      </div>
      <form className="w-full max-w-[400px]" action={googleLoginAction}>
        <button className="w-full p-2 bg-slate-400" type="submit">
          Signin with Google
        </button>
      </form>
      <form
        className="p-6 w-full max-w-[400px] flex flex-col justify-between items-center gap-2 
        border border-solid border-black bg-white rounded"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-black">{error}</div>}
        <label className="w-full text-sm">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="w-full h-8 border border-solid border-black rounded p-2"
          name="email"
        />
        <label className="w-full text-sm">Password</label>
        <div className="flex w-full">
          <input
            type="password"
            placeholder="Password"
            className="w-full h-8 border border-solid border-black rounded p-2"
            name="password"
          />
        </div>
        <button className="w-full border border-solid border-black rounded">
          Sign In
        </button>

        <Link
          href="/register"
          className="text-sm text-[#888] transition duration-150 ease hover:text-black"
        >
          {"Don't have an account?"}
        </Link>
      </form>
    </section>
  );
}
