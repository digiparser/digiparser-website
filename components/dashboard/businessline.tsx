import Link from "next/link";
import Image from "next/image";

export function BusinessLine() {
  return (
    <section
      className="animate-fade-up py-16 text-foreground opacity-0 dark:text-zinc-400"
      style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
    >
      <div className="container mx-auto">
        <h2 className="text-center text-sm font-semibold">
          The worlds most innovative companies automated their document workflows
        </h2>

        <div className="my-7 flex flex-wrap items-center justify-center gap-10 gap-y-8 lg:gap-14">
          {features.map((feature) => (
            <div
              key={feature.icon}
              aria-label={feature.icon}
              className="flex flex-col items-center transition duration-300 hover:text-black dark:hover:text-white"
            >
              <Image src={feature.icon} width={100} height={100}  alt={feature.icon}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: '/img/brands/1.svg',
  },
  {
    icon: '/img/brands/3.svg',
  },
  {
    icon: '/img/brands/4.svg',
  },
  {
    icon: '/img/brands/5.svg',
  },
  {
    icon: '/img/brands/6.svg',
  },
  {
    icon: '/img/brands/7.svg',
  },
  {
    icon: '/img/brands/8.svg',
  },
];
