import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Balancer } from "react-wrap-balancer";
import { GetStartedButton } from "@/components/buttons/GetStartedButton";

const faqs = [
  {
    "question": "How does DigiParser ensure data security?",
    "answer": "DigiParser employs industry-standard encryption protocols and follows strict security measures to safeguard your parsed data. Our infrastructure is designed to prioritize the confidentiality and integrity of your information, ensuring a secure document processing environment."
  },
  {
    "question": "Can I customize parsing rules for unique formats?",
    "answer": "Yes, DigiParser offers a user-friendly interface for creating custom parsing rules. Whether your documents have unique structures or belong to specific industries, our platform allows you to tailor extraction rules, ensuring flexibility and adaptability to diverse document formats."
  },
  {
    "question": "What technical expertise is needed for integration?",
    "answer": "DigiParser is designed with user accessibility in mind. Integrating our solution into your workflows is made easy with a user-friendly API and comprehensive documentation. While technical expertise can enhance customization, even users with basic technical skills can seamlessly integrate DigiParser into their systems, thanks to our intuitive integration tools."
  }
];

export default function FAQ() {
  return (
    <div id="features" className="container mx-auto px-6 py-12 text-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2
            className="animate-fade-up font-urban text-2xl font-extrabold tracking-tight opacity-0 sm:text-3xl md:text-4xl lg:text-5xl"
            style={{animationDelay: "0.25s", animationFillMode: "forwards"}}
          >
            <Balancer>Frequently asked questions</Balancer>
          </h2>
        </div>
      </div>
      <section
        className="text-muted-foreground container space-y-6 py-5 md:py-10 lg:py-15 text-left mx-auto max-w-4xl px-6 lg:px-8"
      >
        <Accordion type="single" collapsible className="w-full">
          {
            faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
      </section>
      <div
        className="mt-8 flex animate-fade-up justify-center space-x-2 opacity-0"
        style={{animationDelay: "0.55s", animationFillMode: "forwards"}}
      >
        <GetStartedButton/>
      </div>
    </div>

  )
}
