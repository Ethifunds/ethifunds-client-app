import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import FAQAccordion from "./faq-accordion";
import * as React from "react";

export default function Faq() {
  const { changeBackBtn } = useUi({ title: "FAQs" });

  React.useLayoutEffect(() => {
    changeBackBtn({
      show: true,
    });
    return () => {
      changeBackBtn(null);
    };
  }, [changeBackBtn]);

  return (
    <AppContainer className="space-y-10 lg:w-[80%]">
      <p className="content-accent text-neutral-500">
        Everything you need to know about Ethifunds savings and investment.
        Can’t find the answer you’re looking for? Please contact our friendly
        team.
      </p>

      <FAQAccordion />
    </AppContainer>
  );
}
