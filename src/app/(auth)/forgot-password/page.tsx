import type { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Forgot Password | JobGregate - Reset Your Account Access",
  description:
    "Forgot your password? Reset it easily on JobGregate to regain access to your account. Secure your job search journey with a quick password recovery process.",
};

export default function Login() {
  return (
    <div className="w-[100vw] h-screen flex items-start justify-center">
      <Main />
    </div>
  );
}
