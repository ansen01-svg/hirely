import type { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Login to JobGregate | Access Your Job Search Dashboard",
  description:
    "Log in to JobGregate to view saved jobs, manage preferences, and continue your job search seamlessly across top platforms.",
};

export default function Login() {
  return (
    <div className="w-[100vw] h-screen flex items-center justify-center">
      <Main />
    </div>
  );
}
