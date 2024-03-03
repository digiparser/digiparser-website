import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div>
            <Image src="/img/logo.svg" alt="logo" width={16} height={16} className={'mr-1 dark:hidden'}/>
            <Image src="/img/logo-light.svg" alt="logo" width={16} height={16} className={'mr-1 hidden dark:block'}/>
          </div>
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
