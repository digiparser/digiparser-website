'use client'

import FAQ from "@/components/dashboard/faq";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { CheckIcon, InfoIcon, MinusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PlanFeature {
  type: string;
  features: {
    name: string;
    free: boolean;
    startup: boolean;
    team: boolean;
    enterprise: boolean;
  }[];
}


const planFeatures: PlanFeature[] = [
  {
    type: "Financial data",
    features: [
      {
        name: "Open/High/Low/Close",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
      {
        name: "Price-volume difference indicator	",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "On-chain data",
    features: [
      {
        name: "Network growth",
        free: true,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Average token age consumed",
        free: true,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Exchange flow",
        free: false,
        startup: false,
        team: true,
        enterprise: true,
      },
      {
        name: "Total ERC20 exchange funds flow",
        free: false,
        startup: false,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    type: "Social data",
    features: [
      {
        name: "Dev activity",
        free: false,
        startup: true,
        team: false,
        enterprise: true,
      },
      {
        name: "Topic search",
        free: true,
        startup: true,
        team: true,
        enterprise: true,
      },
      {
        name: "Relative social dominance",
        free: true,
        startup: true,
        team: false,
        enterprise: true,
      },
    ],
  },
];

export default function PricingSectionCards() {

  const [sliderValue, setSliderValue] = useState([1]);
  const [credits, setCredits] = useState(100);

  const getPrice = (credits: number) => {
    if (credits <= 100) return 29;
    if (credits <= 200) return 49;
    if (credits <= 500) return 99;
    if (credits <= 1000) return 199;
    if (credits <= 2000) return 299;
    if (credits <= 4000) return 499;
    return 999;
  };

  useEffect(() => {
    const newValue = sliderValue[0];
    if (newValue <= 10) {
      setCredits(newValue * 100);
    } else if (newValue > 10) {
      setCredits((newValue - 10) * 1000);
    }
  }, [sliderValue]);

  return (
    <>
      <div className="container py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10 lg:mb-14">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              <span
                className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
                DigiParser
              </span>
            </h2>

            <h1
              className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              <Balancer>Simple pricing</Balancer>
            </h1>

            <p
              className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
              style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
            >
              <Balancer>
                We charge based on documents you process. 
                Your first 100 document parses are free. 
              </Balancer>
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center justify-center">
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Everyone starts</CardTitle>
              <span className="font-bold text-5xl">Free</span>
            </CardHeader>
            <CardDescription className="text-center">
              {/* Get the taste of DigiParser for free */}
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">100 documents</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">1 Parser</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Custom schema</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Unlimited users</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Workflow</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Unlimited integrations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <Link href={'https://app.digiparser.com/auth/join'}>
                  Start for free
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-primary">
            <CardHeader className="text-center pb-2">
              <CardTitle className="!mb-7">Pick a plan</CardTitle>
              <span className="font-bold text-5xl">
                ${getPrice(credits)} <small className="text-xs text-muted-foreground">per month</small>
              </span>
            </CardHeader>
            <CardDescription className="text-center w-11/12 mx-auto">
              
            </CardDescription>
            <CardContent>
              <div className="flex flex-col items-start justify-center space-y-4 m-4 mt-8">
                <Slider 
                  value={sliderValue} 
                  onValueChange={setSliderValue} 
                  min={1} 
                  max={20} 
                  step={1} 
                  className="cursor-pointer" 
                  thumbClassName="bg-white"
                />
                <span className="text-muted-foreground">
                  <HoverCard openDelay={100}>
                    <HoverCardTrigger asChild>
                      <span className="flex items-center text-foreground">
                        {credits} credits per month
                        <InfoIcon className="ml-1 h-4 w-4 cursor-pointer" />
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">What's a credit?</h4>
                        <p className="text-sm">
                          1 credit is equal to:
                        </p>
                        <ul className="text-sm list-disc pl-4">
                          <li>1 page of a document</li>
                          <li>1 image</li>
                        </ul>
                        <p className="text-sm">
                          Credits determine how many document pages or images you can process per month.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </span>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View all plans</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>All Plans</DialogTitle>
                      <DialogDescription>
                        Choose the plan that best fits your needs.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {[100, 200, 500, 1000, 2000, 4000, 10000].map((planCredits) => (
                        <div key={planCredits} className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">${getPrice(planCredits)}/month</p>
                            <p className="text-sm text-muted-foreground">{planCredits} credits</p>
                          </div>
                          <Button variant={'outline'}>
                            <Link href={`https://app.digiparser.com/auth/join?plan=${planCredits}`}>
                              Get Started
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <ul className="mt-7 space-y-2.5 text-sm">
                {/* <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">additional credits at $0.2/credit</span>
                </li> */}
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Unlimited parsers</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Custom schema</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Unlimited users</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Workflow</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Unlimited integrations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Link href={'https://app.digiparser.com/auth/join'}>
                  Get started now
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="mb-7">Enterprise</CardTitle>
            </CardHeader>
            <CardDescription className="text-center  w-11/12 mx-auto">
              Advanced features for enterprises
            </CardDescription>
            <CardContent>
              <ul className="mt-7 space-y-2.5 text-sm">
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Everything from Pro</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Unlimited documents</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Uptrain existing AI models</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">SSO/SAML login</span>
                </li>
                <li className="flex space-x-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                  <span className="text-muted-foreground">Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <Link href={'mailto:sales@digiparser.com'}>
                  Contact us
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        {/* <div className="mt-20 lg:mt-32 max-w-4xl mx-auto">
          <div className="lg:text-center mb-4 lg:mb-8">
            <h3 className="text-2xl font-semibold dark:text-white">
              Compare plans
            </h3>
          </div>
          <Table className="hidden lg:table">
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                <TableHead className="w-3/12 text-primary">Plans</TableHead>
                <TableHead className="w-2/12 text-primary text-lg text-center">
                  Free
                </TableHead>
                <TableHead className="w-2/12 text-primary text-lg text-center">
                  Pro
                </TableHead>
                <TableHead className="w-2/12 text-primary text-lg text-center">
                  Enterprise
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planFeatures.map((featureType) => (
                <>
                  <TableRow className="bg-muted/50" key={featureType.type}>
                    <TableCell colSpan={5} className="font-bold">
                      {featureType.type}
                    </TableCell>
                  </TableRow>
                  {featureType.features.map((feature) => (
                    <TableRow
                      key={feature.name}
                      className="text-muted-foreground"
                    >
                      <TableCell>{feature.name}</TableCell>
                      <TableCell>
                        <div className="mx-auto w-min">
                          {feature.free ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="mx-auto w-min">
                          {feature.startup ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="mx-auto w-min">
                          {feature.enterprise ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>

          <div className="space-y-24 lg:hidden">
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Free</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.enterprise ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Startup</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.startup ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Team</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.team ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
            <section>
              <div className="mb-4">
                <h4 className="text-xl font-medium">Enterprise</h4>
              </div>
              <Table>
                {planFeatures.map((featureType) => (
                  <>
                    <TableRow
                      key={featureType.type}
                      className="bg-muted hover:bg-muted"
                    >
                      <TableCell
                        colSpan={2}
                        className="w-10/12 text-primary font-bold"
                      >
                        {featureType.type}
                      </TableCell>
                    </TableRow>
                    {featureType.features.map((feature) => (
                      <TableRow
                        className="text-muted-foreground"
                        key={feature.name}
                      >
                        <TableCell className="w-11/12">
                          {feature.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {feature.enterprise ? (
                            <CheckCircleIcon className="h-5 w-5" />
                          ) : (
                            <MinusIcon className="h-5 w-5" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </Table>
            </section>
          </div>
        </div> */}
        <div className="mt-24">
          <FAQ />
        </div>
      </div>
    </>
  );
}
