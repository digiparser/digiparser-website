"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function GetStartedButton() {
  const router = useRouter();

  const handleOnClick = () => {
      router.push("/signin");
  };

  return (
    <Link
      className={cn(buttonVariants({ size: "lg" }))}
      // onClick={handleOnClick}
      href={'#waitlist'}
    >
      {/*Get started free*/}
      Join the waitlist now
    </Link>
  );
}
