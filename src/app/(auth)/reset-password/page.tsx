import type { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Reset Password | JobGregate - Secure Your Account",
  description:
    "Reset your password to secure your JobGregate account. Enter a new password and regain seamless access to your job search dashboard.",
};

type ResetPasswordPropType = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ResetPassword({
  searchParams,
}: ResetPasswordPropType) {
  const { token } = await searchParams;

  return (
    <div className="w-[100vw] h-screen flex items-center justify-center">
      <Main token={token || ""} />
    </div>
  );
}
