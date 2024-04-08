import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  // {
  //   label: "Music Generation",
  //   icon: Music,
  //   href: "/music",
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  // {
  //   label: "Code Generation",
  //   icon: Code,
  //   href: "/code",
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  // },
];

/** ROUTES */

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
// export const publicRoutes = ["/", "/pricing"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 */
// export const authRoutes = ["/login", "/register"];

// export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
