import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className={'flex flex-1 items-center mt-10'}>
        <div className={'flex flex-1 justify-center pl-5'}>
          <Image src="/img/logo.svg" alt="logo" width={100} height={100} className={'mr-1 dark:hidden'}/>
          <Image src="/img/logo-light.svg" alt="logo" width={100} height={100} className={'mr-1 hidden dark:block'}/>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-1 flex-col items-center gap-4 px-8 md:gap-2 md:px-0">
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
          <div className={'text-xs text-muted-foreground'}>Copyright ©
            2023-{new Date().getFullYear()} {siteConfig.name}</div>
        </div>
      </div>
    </footer>
  )
}
