"use client";

import { SessionProvider } from "next-auth/react";

type AuthWrapperPropType = {
  children: React.ReactNode;
};

export default function AuthWrapper({ children }: AuthWrapperPropType) {
  return <SessionProvider>{children}</SessionProvider>;
}
