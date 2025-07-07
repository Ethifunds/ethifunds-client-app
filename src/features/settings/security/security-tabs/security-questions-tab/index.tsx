import TabContainer from "@/features/settings/tab-container";
import * as React from "react";
import { securityQuestionSetupGuide } from "./data";
import Form from "./form/form";
import GoBack from "@/components/go-back";

export default React.memo(function SecurityQuestionsTab() {
  return (
    <TabContainer
      value="security_questions"
      title="Setup Security Questions"
      subTitle="Enhance your account security by setting up security questions, these questions add an extra layer of protection, ensuring that only you can recover your account or verify sensitive actions."
      className="space-y-5"
      utilityComponent={<GoBack className="absolute left-0 -top-7 text-xs" />}  
    >
      <ol className="px-5 space-y-4">
        {securityQuestionSetupGuide.map((item) => (
          <li
            key={item.id}
            className="list-decimal caption-standard text-neutral-500"
          >
            {" "}
            {item.text}
          </li>
        ))}
      </ol>

      <Form />
    </TabContainer>
  );
});
