"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  /** Fixed Hydration Error: Hydration failed because the initial UI does not match what was rendered on the server. */
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  /*****************************************************************************************************************/
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon">
          <Menu className="relative z-50 h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
