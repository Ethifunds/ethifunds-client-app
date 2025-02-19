import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { accordionData } from "./data";

export default function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="overflow-auto pr-2">
      {accordionData.map((item, idx) => {
        return (
          <AccordionItem
            key={idx}
            value={idx.toString()}
            className={"border-b-0 border-t py-2 last:border-b"}
          >
            <AccordionTrigger className="content-accent !no-underline text-left text-neutral-1000">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="content-standard pr-12 text-neutral-500">
              {item.text}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
