import { Balancer } from "react-wrap-balancer";
import Flow from "../hero-flow/flow";

export default function Featuressection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
              DigiParser
            </span>
          </h2>

          <h1
            className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>Integrates with every tool you use</Balancer>
          </h1>

          <p
            className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Say goodbye to manual document processing. Enhance accuracy, and efficiency with automated workflows.
            </Balancer>
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16 -mt-[10px] sm:-mt-[20px] md:-mt-[80px] lg:-mt-[100px]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className={'w-full aspect-[2/1] bg-gradient bg-no-repeat bg-[center_120px] lg:bg-[65%_center] lg:bg-[length:35%]'}>
            <Flow initialColor={'#111'}/>
          </div>
        </div>
      </div>
    </div>
  );
}
