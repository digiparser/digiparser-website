import { Balancer } from "react-wrap-balancer";

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon, ServerIcon
} from "@heroicons/react/20/solid";


const features = [
  {
    "name": "Pre-trained and Custom Models",
    "description": "Harness the power of artificial intelligence to intelligently extract and interpret data from documents, ensuring accurate and efficient data extraction.",
    icon: ServerIcon,
  },
  {
    "name": "Industry-Specific Templates",
    "description": "Accelerate setup with ready-to-use templates tailored for specific industries, streamlining the data extraction process for documents commonly used in your business sector.",
    icon: ServerIcon,
  },
  {
    "name": "Workflow Builder and Integrations",
    "description": "Design and customize intricate document processing workflows effortlessly, automating complex tasks and optimizing the overall efficiency of your data extraction processes.",
    icon: ServerIcon,
  },
  {
    "name": "Extensive Document Format Support",
    "description": "Parse documents in a wide array of formats, including PDFs, emails, images, and more, ensuring flexibility and adaptability to diverse document sources.",
    icon: ServerIcon,
  },
  {
    "name": "User-Friendly API",
    "description": "Empower developers with a user-friendly API, simplifying integration with parsers and workflows, and facilitating seamless communication between your SaaS solution and external applications.",
    icon: ServerIcon,
  },
  {
    "name": "Enterprise Friendly",
    "description": "Tailored for enterprise needs, our solution ensures scalability, security, and compliance, making it an ideal choice for businesses with demanding data extraction requirements.",
    icon: ServerIcon,
  },
];

const CallToActionComponent = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2
        className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl"
        style={{animationDelay: "0.25s", animationFillMode: "forwards"}}
      >
        <Balancer>Boost your productivity today</Balancer>
      </h2>
      <p
        className="mt-2 animate-fade-up leading-normal text-muted-foreground opacity-0"
        style={{animationDelay: "0.45s", animationFillMode: "forwards"}}
      >
        <Balancer>
          Streamline your property listings and client interactions with the
          precision of AI. Badget delivers a suite of tools that elevate your
          efficiency and let you focus on closing deals – not on paperwork.
        </Balancer>
      </p>
      {/*<div*/}
      {/*  className="mt-8 flex animate-fade-up justify-center space-x-2 opacity-0"*/}
      {/*  style={{animationDelay: "0.55s", animationFillMode: "forwards"}}*/}
      {/*>*/}
      {/*  <GetStartedButton/>*/}
      {/*</div>*/}
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 text-left"
      >
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {
            features.map((feature, key) => (
              <div key={key} className="relative overflow-hidden rounded-lg border bg-background p-2">
                <div className="flex flex-col justify-between rounded-md p-6">
                  <feature.icon className="h-12 w-12 mb-5" aria-hidden="true" />
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
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy also includes a blog and a full-featured documentation site
            built using Contentlayer and MDX.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CallToActionComponent;
