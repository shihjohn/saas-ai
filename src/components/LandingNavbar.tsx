import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ModeToggle from "./ModeToggle";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const Navbar = async () => {
  const session = await getServerSession(options);

  const user = session?.user;

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-border/40 bg-white/75 dark:bg-gray-900/75 backdrop-blur transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <MobileNav isAuth={!!user} />

          <Link href="/" className="flex items-center z-40">
            <div className="relative w-24 h-8 mr-2">
              <Image fill alt="logo" src="/logo.png" />
            </div>
            <h1 className={cn("text-4xl font-bold", montserrat)}>AI</h1>
          </Link>
          <div className="items-center flex gap-2">
            {!user ? (
              <>
                <div className="hidden md:block">
                  <Link
                    href="/pricing"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Pricing
                  </Link>
                </div>
                <Link
                  href="/api/auth/signin"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </Link>
                {/* <a
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </a> */}
              </>
            ) : (
              <>
                <div className="hidden md:block">
                  <Link
                    href="/pricing"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Pricing
                  </Link>
                </div>
                <ModeToggle />
                <UserAccountNav
                  name={!user.name ? "Your Account" : `${user.name}`}
                  email={user.email ?? ""}
                  imageUrl={user.image ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
