import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, ImageIcon, MessageSquare, VideoIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation-preview.jpg",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    description: "Our most advanced conversation model.",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image-preview.jpg",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    description: "Turn your prompt into an image.",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video-preview.jpg",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "Turn your prompt into video.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-20 mt-40 flex flex-col items-center justify-center text-center">
        <h1 className=" max-w-[400px] md:max-w-[500px] lg:max-w-[600px] text-5xl font-bold md:text-6xl lg:text-7xl">
          Explore the power of <span className="text-[#02aab0]">OpenAI</span>
        </h1>
        <p className="mt-5 max-w-[640px] sm:text-lg">
          This website serves as an experimental platform dedicated to unlocking
          the capabilities of OpenAI. Feel free to log in and start exploring
          immediately.
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5 bg-[#02aab0] hover:bg-[#00cdac]",
          })}
          href="/dashboard"
          target="_blank"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row gap-4">
                {tools.map((tool, i) => (
                  <Card
                    key={tool.href}
                    className="p-4 border-gray-500/10 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex flex-col items-center gap-x-4">
                      <div className="flex gap-2 items-center w-full">
                        <div
                          className={cn("p-2 w-fit rounded-md", tool.bgColor)}
                        >
                          <tool.icon className={cn("w-4 h-4 ", tool.color)} />
                        </div>
                        <div className="font-semibold leading-4">
                          {tool.label}{" "}
                          <span
                            className={
                              i === 0 ? "hidden" : "text-sm text-slate-500"
                            }
                          >
                            (coming soon)
                          </span>
                        </div>
                      </div>
                      <Image
                        src={tool.href}
                        alt="product preview"
                        width={1364}
                        height={866}
                        quality={100}
                        className="my-[10px]"
                      />
                      <p className="w-full text-slate-500 text-sm text-left">
                        {tool.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-16 max-w-5xl">
        {/* steps */}
        <ol className="m-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-slate-500">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-slate-500">
                Either starting out with a free plan or choose our{" "}
                <Link
                  href="/pricing"
                  className="text-[#02aab0] hover:text-[#00cdac] underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-slate-500">Step 2</span>
              <span className="text-xl font-semibold">
                Start exploring the power of AI
              </span>
              <span className="mt-2 text-slate-500">
                It&apos;s that simple. Try out today - it really takes less than
                a minute.
              </span>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}
