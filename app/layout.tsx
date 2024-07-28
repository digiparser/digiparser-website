import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import 'reactflow/dist/style.css';
import "@/styles/globals.css"

import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Automation",
    "Document Workflows",
    "Invoice OCR",
    "Receipt OCR",
    "Automate Business Processes",
  ],
  authors: [
    {
      name: "thepantales",
      url: "https://x.com/thepantales",
    },
  ],
  creator: "thepantales",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@thepantales",
  },
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon-16x16.png",
    apple: "/img/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/img/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-JTZGZ6TFJ7" />
    </html>
  )
}
