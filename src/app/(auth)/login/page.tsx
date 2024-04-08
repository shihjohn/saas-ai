"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { buttonVariants } from "../../../components/ui/button";
import { useSearchParams } from "next/navigation";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";

// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
// import { login } from "@/actions/login";

const Login = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");
  // const onClick = (provider: "google" | "github") => {
  //   signIn(provider, {
  //     callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  //   });
  // };

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: zodResolver(schema),
  // });
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const form = useRef<HTMLFormElement>(null);
  const submitData = (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      // login(data).then(({ error, success }) => {
      //   setError(error);
      //   setSuccess(success);
      // });

      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
        return;
      }
      router.replace("/dashboard");
      console.log("form data", data);
    });
  };

  if (sessionStatus === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center w-full gap-x-2">
              <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => signIn("google")}
              >
                <FcGoogle className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={() => signIn("github")}
              >
                <FaGithub className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-center text-gray-500 mt-4 mb-4">- OR -</div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitData)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email"
                          disabled={isPending}
                          className="bg-slate-100 dark:bg-slate-900 focus:bg-slate-200 dark:focus:bg-slate-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      {/* <FormLabel>Password</FormLabel> */}
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="password"
                          disabled={isPending}
                          className="bg-slate-100 dark:bg-slate-900 focus:bg-slate-200 dark:focus:bg-slate-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  disabled={isPending}
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "w-full mt-3 text-white bg-gradient-to-r from-[#02aab0] to-[#00cdac]"
                  )}
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Link
              className="w-full text-center hover:underline mb-2"
              href="/register"
            >
              Do not have an account?
            </Link>
          </CardFooter>
        </Card>
      </div>
      //   <div className="bg-[#0d1117] p-8 rounded-[2rem] shadow-md w-96">
      //     <h1 className="text-4xl text-center font-semibold mb-8"></h1>
      //   </div>
    )
  );
};

export default Login;
