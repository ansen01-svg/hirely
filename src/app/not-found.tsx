import { Metadata } from "next";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export const metadata: Metadata = {
  title: "Not found - 404 Error",
  description: "Page not found.",
};

export default function NotFound() {
  return (
    <div className="w-full h-full">
      <Header />
      <main className="w-full px-10 py-10 flex items-center justify-center">
        <div className="w-full md:w-[400px] py-12 flex flex-col items-center justify-center gap-14 border-solid border-[1px] border-slate-300">
          <h1 className="text-[100px] font-semibold text-primaryLight">404</h1>
          <p className="text-[15px] text-primaryLight">
            {"Sorry, we couldn't find that page."}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
