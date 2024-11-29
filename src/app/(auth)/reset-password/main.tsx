"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import MuiTextField from "@/app/components/mui_text_field/mui_text_field";
import logo from "@/app/assets/j.jpg";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type MianPropType = {
  token: string;
};

export default function Main({ token }: MianPropType) {
  const [error, setError] = useState<string>("");
  const [passwordChanged, setPasswordChanged] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isCredentialButtonDisabled, setIsCredentialButtonDisabled] =
    useState<boolean>(false);

  const router = useRouter();

  // load password state on component mount
  useEffect(() => {
    const isPasswordChanged = sessionStorage.getItem("isPasswordChanged");

    if (isPasswordChanged === "true") {
      setPasswordChanged(true);
    } else {
      setPasswordChanged(false);
    }
  }, []);

  // set password sent state to local storage
  useEffect(() => {
    if (typeof passwordChanged === "boolean") {
      sessionStorage.setItem("isPasswordChanged", passwordChanged.toString());
    }
  }, [passwordChanged]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCredentialButtonDisabled(true);

    try {
      const formData = new FormData(event.currentTarget);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirm-password") as string;

      if (!password || !confirmPassword) return;

      if (password !== confirmPassword) {
        setError("Password does not match");
        setPasswordChanged(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/custom_auth/reset_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, token }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        setPasswordChanged(false);
        return;
      }

      setError("");
      setPasswordChanged(true);
    } catch (error) {
      console.error("login error-", error);
      setError("An error occured.");
      setPasswordChanged(false);
    } finally {
      setIsCredentialButtonDisabled(false);
    }
  };

  const handleBackButtonClick = () => {
    router.push("/");
  };

  if (!token) return <NoToken />;

  if (!passwordChanged) {
    return (
      <ResetPasswordFormComponent
        error={error}
        handleSubmit={handleSubmit}
        showPassword={showPassword}
        handleShowPassword={handleShowPassword}
        showConfirmPassword={showConfirmPassword}
        handleShowConfirmPassword={handleShowConfirmPassword}
        isCredentialButtonDisabled={isCredentialButtonDisabled}
      />
    );
  }

  return <EmailSentComponent handleBackButtonClick={handleBackButtonClick} />;
}

type ResetPasswordFormComponentPropType = {
  error: string;
  isCredentialButtonDisabled: boolean;
  showPassword: boolean;
  handleShowPassword: () => void;
  showConfirmPassword: boolean;
  handleShowConfirmPassword: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type EmailSentComponentPropType = {
  handleBackButtonClick: () => void;
};

function NoToken() {
  return (
    <section className="w-[400px] flex flex-col items-center justify-center gap-5 rounded">
      <div className="p-4 rounded-full border-solid border-[2px] border-secondary">
        <CloseOutlinedIcon sx={{ fontSize: "50px", color: "#10a37f" }} />
      </div>
      <p className="text-[14px] text-error">
        No token provided. Unable to verify your email.
      </p>
    </section>
  );
}

function ResetPasswordFormComponent(props: ResetPasswordFormComponentPropType) {
  const {
    error,
    handleSubmit,
    isCredentialButtonDisabled,
    showPassword,
    handleShowPassword,
    showConfirmPassword,
    handleShowConfirmPassword,
  } = props;

  return (
    <section className="w-[400px] mb-36 flex flex-col items-center justify-center gap-5 rounded">
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
          Enter a new password below to change your password.
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
          <MuiTextField
            label="New password*"
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

          <MuiTextField
            label="Re-enter new password*"
            type={showConfirmPassword ? "text" : "password"}
            name="confirm-password"
            handleClick={handleShowConfirmPassword}
            icon={
              showConfirmPassword ? (
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
              Reset password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function EmailSentComponent({
  handleBackButtonClick,
}: EmailSentComponentPropType) {
  return (
    <section className="w-[400px] flex flex-col items-center justify-center gap-5 rounded">
      <div className="p-4 rounded-full border-solid border-[2px] border-secondary">
        <CheckOutlinedIcon sx={{ fontSize: "50px", color: "#10a37f" }} />
      </div>
      <h1 className="text-[22px]">Password Changed!</h1>
      <p className="text-[14px] text-center">
        Your password has been changed successfully.
      </p>
      <button
        className="px-12 py-3 text-[15px] text-white bg-secondary rounded"
        onClick={handleBackButtonClick}
      >
        Back to Jobgregate
      </button>
    </section>
  );
}
