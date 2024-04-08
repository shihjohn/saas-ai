"use client";
import { SessionProvider } from "next-auth/react";

/*
 * Please note <SessionProvider /> requires a client component and therefore cannot be put inside the root layout.
 * There we have created this helper component.
 */

const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
