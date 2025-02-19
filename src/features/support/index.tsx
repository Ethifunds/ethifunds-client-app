import AppContainer from "@/components/container/container";
import useUi from "@/hooks/use-ui";
import ContactUs from "./contact-us";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Form from "./form";

export default function Support() {
  useUi({ title: "Support" });

  return (
    <AppContainer className="space-y-5">
      <p className="content-accent text-neutral-500 lg:w-[80%]">
        Need help? Our support team is here to assist you with any questions or
        issues to make your Ethifunds experience seamless.
      </p>

      <div className="space-y-10 lg:w-1/2">
        <h1 className="feature-standard text-neutral-1000">
          Hi, How can we help you?
        </h1>

        <Form />
        <ContactUs />

        <Link
          to={"/support/faq"}
          className="flex items-center justify-between rounded-lg border px-4 py-3.5"
        >
          <span className="content-standard text-neutral-1000">FAQs</span>
          <ChevronRight />
        </Link>
      </div>
    </AppContainer>
  );
}
