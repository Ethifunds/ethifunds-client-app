import TabContainer from "@/features/settings/tab-container";
import * as React from "react";
import { securityQuestionSetupGuide } from "./data";
import Form from "./form/form";

export default React.memo(function SecurityQuestionsTab() {
  return (
    <TabContainer
      value="security_questions"
      title="Setup Security Questions"
      subTitle="Enhance your account security by setting up security questions, these questions add an extra layer of protection, ensuring that only you can recover your account or verify sensitive actions."
      className="space-y-5"
    >
      <ol className="space-y-4 px-5">
        {securityQuestionSetupGuide.map((item) => (
          <li
            key={item.id}
            className="caption-standard list-decimal text-neutral-500"
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
