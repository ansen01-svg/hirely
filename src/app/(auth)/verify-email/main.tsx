"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export default function Main() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Post token to the API for verification
  const verifyEmail = useCallback(async () => {
    if (!token) {
      setIsVerified(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/custom_auth/verify_email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        console.error("Verification failed:", await response.json());
        setIsVerified(false);
      } else {
        setIsVerified(true);
        router.push("/");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  // Trigger email verification on component mount
  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  if (loading) {
    return (
      <section className="w-[400px] flex flex-col items-center justify-center gap-3 rounded">
        <p className="text-[15px] text-secondary">Verifying your email...</p>
      </section>
    );
  }

  if (!token) {
    return (
      <section className="w-[400px] flex flex-col items-center justify-center gap-5 rounded">
        <div className="p-4 rounded-full border-solid border-[2px] border-secondary">
          <CloseOutlinedIcon sx={{ fontSize: "50px", color: "#10a37f" }} />
        </div>
        <p className="text-[15px] text-error">
          No token provided. Unable to verify your email.
        </p>
      </section>
    );
  }

  return isVerified ? <Verified /> : <NotFound token={token} />;
}

type NotFoundPropType = {
  token: string;
};

function NotFound({ token }: NotFoundPropType) {
  const [msg, setMsg] = useState("");

  const resendVerificationEmail = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/custom_auth/resend_user_verification_email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setMsg(data.error);
        return;
      }

      const data = await response.json();
      setMsg(data.message);
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
  };

  return (
    <section className="w-[400px] flex flex-col items-center justify-center gap-3 rounded">
      <div className="p-4 mb-2 rounded-full border-solid border-[2px] border-secondary">
        <CloseOutlinedIcon sx={{ fontSize: "50px", color: "#10a37f" }} />
      </div>
      <p className="text-[15px] text-error">Email verification failed.</p>
      <p className="text-[15px]">
        Click below to request another verification email.
      </p>
      {msg && <p className="text-[14px] text-red-600">{msg}</p>}
      <button
        className="px-5 py-2 text-[15px] text-white bg-secondary rounded"
        onClick={resendVerificationEmail}
      >
        Resend email
      </button>
    </section>
  );
}

function Verified() {
  return (
    <section className="w-[400px] flex flex-col items-center justify-center gap-5 rounded">
      <div className="p-4 rounded-full border-solid border-[2px] border-secondary">
        <CheckOutlinedIcon sx={{ fontSize: "50px", color: "#10a37f" }} />
      </div>
      <p className="text-[15px] text-secondary">
        Your email has been successfully verified.
      </p>
    </section>
  );
}
