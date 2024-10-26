import type { Metadata } from "next";
import Main from "./main";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};

export default function Register() {
  return (
    <div className="w-[100vw] h-screen flex items-center justify-center">
      <Main />
    </div>
  );
}
