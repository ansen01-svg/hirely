"use client";

import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";
import MuiTextField from "@/app/components/mui_text_field/mui_text_field";
import logo from "@/app/assets/j.jpg";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";

export default function Main() {
  const [error, setError] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [isCredentialButtonDisabled, setIsCredentialButtonDisabled] =
    useState<boolean>(false);

  // load email state on component mount
  useEffect(() => {
    const isEmailSent = sessionStorage.getItem("isEmailSent");

    if (isEmailSent === "true") {
      setEmailSent(true);
    } else {
      setEmailSent(false);
    }
  }, []);

  // set email sent state to local storage
  useEffect(() => {
    if (typeof emailSent === "boolean") {
      sessionStorage.setItem("isEmailSent", emailSent.toString());
    }
  }, [emailSent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCredentialButtonDisabled(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;

      if (!email) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/custom_auth/forgot_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        setEmailSent(false);
        return;
      }

      setError("");
      setEmailSent(true);
    } catch (error) {
      console.error("login error-", error);
      setError("Incorrect email or password.");
      setEmailSent(false);
    } finally {
      setIsCredentialButtonDisabled(false);
    }
  };

  const resendEmail = () => {
    setEmailSent(false);
  };

  if (!emailSent) {
    return (
      <ResetPasswordFormComponent
        error={error}
        handleSubmit={handleSubmit}
        isCredentialButtonDisabled={isCredentialButtonDisabled}
      />
    );
  } else {
    return <EmailSentComponent resendEmail={resendEmail} />;
  }
}

type ResetPasswordFormComponentPropType = {
  error: string;
  isCredentialButtonDisabled: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type EmailSentComponentPropType = {
  resendEmail: () => void;
};

function ResetPasswordFormComponent(props: ResetPasswordFormComponentPropType) {
  const { error, handleSubmit, isCredentialButtonDisabled } = props;

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
      <div className="w-full px-8">
        <h1 className="text-[28px] font-medium text-center text-primaryLight">
          Reset your password
        </h1>
      </div>

      <div className="w-full px-8">
        <p className="text-sm text-center text-primaryLight">
          Enter your Phone number or Email address and we will send you
          instructions to reset your password.
        </p>
      </div>

      {error && (
        <div className="w-full px-8 text-center">
          <p className="text-[14px] text-red-600">{error}</p>
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full px-8 flex flex-col justify-between items-center gap-2"
        >
          <MuiTextField label="Email" type="email" name="email" />

          <div className="w-full">
            <button
              className="w-full h-[52px] bg-secondary text-white text-[15px] rounded disabled:bg-secondaryDark hover:bg-secondaryDark"
              disabled={isCredentialButtonDisabled}
            >
              Continue
            </button>
          </div>

          <div className="w-full text-center">
            <Link
              href={"/login"}
              className="font-medium text-[15px] text-secondary"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

function EmailSentComponent({ resendEmail }: EmailSentComponentPropType) {
  return (
    <section className="w-[400px] mt-36 flex flex-col items-center justify-center gap-5 rounded">
      <div className="p-4 rounded-full border-solid border-[2px] border-secondary">
        <MarkunreadOutlinedIcon sx={{ fontSize: "50px", color: "#10a37f" }} />
      </div>
      <h1 className="text-[22px]">Check Your Email</h1>
      <p className="text-[14px] text-center">
        Please check the email address for instructions to reset your password.
      </p>
      <button
        className="px-12 py-3 text-[15px] border-solid border-[1px] border-slate-300 rounded"
        onClick={resendEmail}
      >
        Resend email
      </button>
    </section>
  );
}
