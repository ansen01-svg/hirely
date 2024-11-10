import type { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Sign Up for JobGregate | Start Your Job Search Today",
  description:
    "Join JobGregate to access job listings from top platforms in one place. Create an account to save jobs, set preferences, and streamline your job search.",
};

export default function Register() {
  return (
    <div className="w-[100vw] h-screen flex items-start justify-center">
      <Main />
    </div>
  );
}
