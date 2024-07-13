import { Balancer } from "react-wrap-balancer";

import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon, CircleStackIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon, DocumentDuplicateIcon,
  FingerPrintIcon, LinkIcon,
  LockClosedIcon, PuzzlePieceIcon, ServerIcon, ShieldCheckIcon
} from "@heroicons/react/20/solid";


const features = [
  {
    "name": "Pre-trained and custom models",
    "description": "Harness the power of artificial intelligence to intelligently extract and interpret data from documents, ensuring accurate and efficient data extraction.",
    icon: AdjustmentsHorizontalIcon,
  },
  {
    "name": "Industry-specific templates",
    "description": "Accelerate setup with ready-to-use templates tailored for specific industries, streamlining the data extraction process for documents commonly used in your business sector.",
    icon: CircleStackIcon,
  },
  {
    "name": "Workflow builder and integrations",
    "description": "Design and customize intricate document processing workflows effortlessly, automating complex tasks and optimizing the overall efficiency of your data extraction processes.",
    icon: PuzzlePieceIcon,
  },
  {
    "name": "Extensive document format support",
    "description": "Parse documents in a wide array of formats, including PDFs, emails, images, and more, ensuring flexibility and adaptability to diverse document sources.",
    icon: DocumentDuplicateIcon,
  },
  {
    "name": "User-friendly API",
    "description": "Empower developers with a user-friendly API, simplifying integration with parsers and workflows, and facilitating seamless communication between your SaaS solution and external applications.",
    icon: LinkIcon,
  },
  {
    "name": "Enterprise friendly",
    "description": "Tailored for enterprise needs, our solution ensures scalability, security, and compliance, making it an ideal choice for businesses with demanding data extraction requirements.",
    icon: ShieldCheckIcon,
  },
];

const CallToActionComponent = () => {
  return (
    <div id="features" className="container mx-auto px-6 py-12 text-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            <span
              className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
              DigiParser
            </span>
          </h2>

          <h1
            className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{animationDelay: "0.25s", animationFillMode: "forwards"}}
          >
            <Balancer>OCR on steroids</Balancer>
          </h1>

          <p
            className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{animationDelay: "0.35s", animationFillMode: "forwards"}}
          >
            <Balancer>
              It&apos;s not just another OCR API, it&apos;s a suite of tools that allow you to automate business processes from end to end with ease.
            </Balancer>
          </p>
        </div>
      </div>
      <section
        className="container space-y-6 py-8 md:py-12 lg:py-24 text-left"
      >
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {
            features.map((feature, key) => (
              <div key={key} className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex flex-col justify-between rounded-md p-6">
                  <feature.icon className="h-12 w-12 mb-5" aria-hidden="true"/>
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {/*<div className="mx-auto text-center md:max-w-[58rem]">*/}
        {/*  <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">*/}
        {/*    Taxonomy also includes a blog and a full-featured documentation site*/}
        {/*    built using Contentlayer and MDX.*/}
        {/*  </p>*/}
        {/*</div>*/}
      </section>
    </div>
  );
};

export default CallToActionComponent;
