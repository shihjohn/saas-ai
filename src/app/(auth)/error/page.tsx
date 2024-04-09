import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";
import { buttonVariants } from "../../../components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="flex gap-1 text-rose-500 justify-center">
            <MdErrorOutline />
            Oops! Something went wrong!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 mt-4 mb-4">
            <p>test</p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/login" className="w-full">
            <Button
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "w-full mt-3 text-white bg-gradient-to-r from-[#02aab0] to-[#00cdac]"
              )}
            >
              Back to login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
