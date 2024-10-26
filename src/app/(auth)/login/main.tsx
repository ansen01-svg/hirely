"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { login } from "@/app/actions/login";
import GoogleLoginForm from "@/app/components/google_login_form/google_login_form";
import MuiTextField from "@/app/components/mui_text_field/mui_text_field";

export default function Main() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) return;

      const res = await login({
        email,
        password,
      });

      if (!res) {
        setError("Incorrect email or password.");
      }

      if (res?.error) {
        setError(res.error as string);
      }

      if (res?.ok) {
        console.log("success");
        return router.push("/");
      }
    } catch (error) {
      console.error("login error-", error);
      setError("Incorrect email or password.");
    }
  };

  return (
    <section className="w-[400px] py-5 flex flex-col items-center justify-center gap-5 rounded">
      <div className="w-full">
        <h1 className="text-[28px] font-medium text-center text-primaryLight">
          Welcome back
        </h1>
      </div>
      {error && (
        <div className="w-full text-center">
          <p className="text-[14px] text-red-600">{error}</p>
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full px-8 flex flex-col justify-between items-center gap-2"
        >
          <MuiTextField label="Email" type="email" name="email" />
          <MuiTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            handleClick={handleShowPassword}
            icon={
              showPassword ? (
                <VisibilityIcon fontSize="small" sx={{ color: "#2d333a" }} />
              ) : (
                <VisibilityOffIcon fontSize="small" sx={{ color: "#2d333a" }} />
              )
            }
          />
          <button className="w-full h-[52px] bg-secondary text-white text-[15px] rounded">
            Login
          </button>
          <Link href="/register" className="text-[13px] text-secondary">
            {"Don't have an account?"}
          </Link>
        </form>
      </div>
      <div className="w-full px-8">
        <div className="w-full flex items-center justify-center">
          <div className="flex-grow border-none h-[1px] bg-slate-300 mr-2"></div>
          <div>
            <p className="text-[13px]">or</p>
          </div>
          <div className="flex-grow border-none h-[1px] bg-slate-300 ml-2"></div>
        </div>
      </div>
      <div className="w-full">
        <GoogleLoginForm title="Sign in with Google" />
      </div>
    </section>
  );
}
