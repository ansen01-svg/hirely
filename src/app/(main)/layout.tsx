import React from "react";
// import Header from "../components/header/header";
import Header1 from "../components/header copy/header";
import Footer from "../components/footer/footer";

type LayoutPropType = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutPropType) {
  return (
    <div>
      <Header1 />
      {children}
      <Footer />
    </div>
  );
}
