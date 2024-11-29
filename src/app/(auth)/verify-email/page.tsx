import type { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Verify Your Email | JobGregate - Activate Your Account",
  description:
    "Verify your email to activate your JobGregate account. Gain access to job searches, saved preferences, and personalized career opportunities across top platforms., and continue your job search seamlessly across top platforms.",
};

type VerifyEmailPropType = { searchParams: { token?: string } };

export default async function VerifyEmail({
  searchParams,
}: VerifyEmailPropType) {
  const { token } = await searchParams;

  return (
    <div className="w-[100vw] h-screen flex items-center justify-center">
      <Main token={token || ""} />
    </div>
  );
}
