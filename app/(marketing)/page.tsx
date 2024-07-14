import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GetStartedButton } from "@/components/buttons/GetStartedButton";
import { BusinessLine } from "@/components/dashboard/businessline";
import CallToActionComponent from "@/components/dashboard/calltoaction";
import Featuressection from "@/components/dashboard/feautressection";
import { Icons } from "@/components/shared/icons";
import {VideoCameraIcon} from '@heroicons/react/24/outline';
import { ChevronRightIcon } from "@radix-ui/react-icons";
import SignUpFormReact from "@/components/waitlistForm";
import FAQ from "@/components/dashboard/faq";
import { siteConfig } from "@/config/site";
import { FlipWords } from "@/components/ui/flip-words";

export const metadata = {
  title: "DigiParser - Extract data from documents and automate paperwork",
  description: "An app that lets you import any documents, extract JSON data based on your defined schema, and export this data to your business tools for automated data entries.",
  openGraph: {
    title: "DigiParser - Extract data from documents and automate paperwork",
    description: "An app that lets you import any documents, extract JSON data based on your defined schema, and export this data to your business tools for automated data entries.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "DigiParser - Extract data from documents and automate paperwork",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiParser - Extract data from documents and automate paperwork",
    description: "An app that lets you import any documents, extract JSON data based on your defined schema, and export this data to your business tools for automated data entries.",
    images: [siteConfig.ogImage],
  },
}

export default async function IndexPage() {

  const words = [
    'invoices', 
    'payslips', 
    'resumes', 
    'contracts',
    'bank statements', 
    'passport', 
    'driving license',
    'any document',
  ];

  return (
    <>
      <section id={'waitlist'} className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[70rem] flex-col items-center gap-5 text-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "animate-fade-up opacity-0 text-muted-foreground",
            )}
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            target="_blank"
          >
            {/* Whitelabel support coming soon for agencies */}
            {/*<ChevronRightIcon className="ml-2 h-4 w-4" />*/}
            Automate document workflows in minutes
          </Link>

          <h1
            className="animate-fade-up font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Parse{" "}
            <FlipWords words={words} />
            <br/>
            {" "} and automate paperwork
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Extract data from any document with our AI powered OCR models, and automate business processes with simple no-code workflow builder.
            </Balancer>
          </p>

          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <GetStartedButton />
            {/* <Link
              href={"/signin"}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4",
              )}
            >
              <VideoCameraIcon className="mr-2 h-4 w-4" />
              <p>
                Watch{" "}
                <span className="hidden sm:inline-block">Demo</span>{" "}
                Video
              </p>
            </Link> */}
            {/* <SignUpFormReact /> */}
          </div>
        </div>
      </section>
      <BusinessLine />
      <section>
        <Featuressection />
      </section>
      <section>
        <CallToActionComponent />
      </section>
      <section>
        <FAQ />
      </section>
      {/*<section>*/}
      {/*  <FeatureSection1 />*/}
      {/*</section>*/}
      
    </>
  );
}
