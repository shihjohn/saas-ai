"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const UpgradeButton = () => {
  const [loading, setLoading] = useState(false);
  const onSubscribe = async () => {
    try {
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={onSubscribe}
      size="lg"
      variant="default"
      className="w-full"
    >
      Upgrade
      <Zap className="w-4 h-4 ml-2 fill-white" />
    </Button>
  );
};

export default UpgradeButton;
