"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function GetStartedButton() {

  return (
    <div className="mt-8">
      <div>
        <Link
          className={cn(buttonVariants({ size: "lg" }))}
          // onClick={handleOnClick}
          href={'https://app.digiparser.com/auth/join'}
        >
          Get Started for FREE
        </Link>
      </div>
      <small>no cc required</small>
    </div>
  );
}
