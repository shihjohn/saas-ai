"use client";
import { useState, useCallback, useEffect, startTransition } from "react";
import Link from "next/link";
import {
  MdArrowBack,
  MdErrorOutline,
  MdOutlineCheckCircle,
} from "react-icons/md";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";

const NewVerification = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = useCallback(async () => {
    setError("");
    setSuccess("");
    if (!token) {
      setError("Missing token!");
      return;
    }
    startTransition(() => {
      newVerification(token)
        .then(({ success, error }) => {
          setError(error);
          setSuccess(success);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  }, [token]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          {success && (
            <CardTitle className="flex gap-1 text-teal-500 justify-center">
              <MdOutlineCheckCircle />
              Email Verified
            </CardTitle>
          )}
          {error && (
            <CardTitle className="flex gap-1 text-rose-500 justify-center">
              <MdErrorOutline />
              Email Verification Error
            </CardTitle>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 mt-4 mb-4">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </CardContent>
        <CardFooter>
          <Link
            className="w-full flex gap-1 items-center justify-center hover:underline mb-2"
            href="/login"
          >
            <MdArrowBack />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewVerification;
