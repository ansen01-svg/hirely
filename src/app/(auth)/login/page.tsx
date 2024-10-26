import type { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function Login() {
  return (
    <div className="w-[100vw] h-screen flex items-center justify-center">
      <Main />
    </div>
  );
}
