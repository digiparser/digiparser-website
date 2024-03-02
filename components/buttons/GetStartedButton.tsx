"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export function GetStartedButton() {
  const router = useRouter();

  const handleOnClick = () => {
      router.push("/signin");
  };

  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={handleOnClick}
    >
      Get started
    </Button>
  );
}
