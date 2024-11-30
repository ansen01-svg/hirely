"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { register } from "@/app/actions/register";
import GoogleLoginForm from "@/app/components/google_login_form/google_login_form";
import MuiTextField from "@/app/components/mui_text_field/mui_text_field";
import logo from "@/app/assets/j.jpg";

export default function Main() {
  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isCredentialButtonDisabled, setIsCredentialButtonDisabled] =
    useState<boolean>(false);

  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsCredentialButtonDisabled(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!email || !username || !password) {
      setError("All fields are required.");
      setIsCredentialButtonDisabled(false);
      return;
    }

    try {
      const response = await register({
        email: email.trim(),
        password: password.trim(),
        username: username.trim(),
      });

      if (response?.success === false) {
        setError(response.error);
      } else if (response?.success === true) {
        ref.current?.reset();
        router.push("/login");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("A network error occurred. Please try again.");
    } finally {
      setIsCredentialButtonDisabled(false);
    }
  };

  return (
    <section className="w-[400px] mt-9 flex flex-col items-center justify-center gap-5 rounded">
      <div className="w-full flex items-center justify-center">
        <div className="w-[50px] h-12 relative">
          <Image
            src={logo}
            alt={"logo"}
            fill
            priority
            sizes="50px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-[28px] font-medium text-center text-primaryLight">
          Create an account
        </h1>
      </div>
      {error && (
        <div className="w-full text-center">
          <p className="text-[14px] text-red-600">{error}</p>
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className="w-full px-8 flex flex-col justify-between items-center gap-2"
        >
          <MuiTextField label="Username" type="username" name="username" />

          <MuiTextField label="Email" type="email" name="email" />

          <MuiTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            handleClick={handleShowPassword}
            icon={
              showPassword ? (
                <VisibilityOutlinedIcon
                  fontSize="small"
                  sx={{ color: "#2d333a" }}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  fontSize="small"
                  sx={{ color: "#2d333a" }}
                />
              )
            }
          />

          <div className="w-full">
            <button
              className="w-full h-[52px] bg-secondary text-white text-[15px] rounded disabled:bg-secondaryDark hover:bg-secondaryDark"
              disabled={isCredentialButtonDisabled}
            >
              Sign up
            </button>
          </div>

          <div className="w-full text-center">
            <Link href="/login" className="text-[13px] text-secondary">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
      <div className="w-full px-8">
        <div className="w-full flex items-center justify-center">
          <div className="flex-grow border-none h-[1px] bg-slate-300 mr-2"></div>
          <div>
            <p className="text-[13px]">OR</p>
          </div>
          <div className="flex-grow border-none h-[1px] bg-slate-300 ml-2"></div>
        </div>
      </div>
      <div className="w-full">
        <GoogleLoginForm title="Continue with Google" />
      </div>
    </section>
  );
}
