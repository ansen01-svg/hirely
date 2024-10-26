import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

type LayoutPropType = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutPropType) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
