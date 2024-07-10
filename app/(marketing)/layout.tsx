import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { ModeToggle } from "@/components/mode-toggle";
import * as React from "react";

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav className={'gap-6 md:flex'}>
            <div className="flex gap-2 md:gap-4">
              <div
                className={'mr-2 flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm'}>
                <ModeToggle/>
              </div>
              <Link
                href={'https://app.digiparser.com/auth/login'}
                className={cn(
                  buttonVariants({variant: "ghost", size: "sm"}),
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                )}
              >
                Login
              </Link>
              <Link
                href={'https://app.digiparser.com/auth/join'}
                className={cn(
                  buttonVariants({variant: "default", size: "sm"}),
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
                )}
              >
                Signup
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter/>
    </div>
  )
}
