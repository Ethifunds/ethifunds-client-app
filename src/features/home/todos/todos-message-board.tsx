import AppButton from "@/components/app-button";
import "./index.css";
import * as React from "react";

type MessageProps = {
  progress: number;
  continueBtn: () => void;
};
export default React.memo(function TodosMessageBoard(props: MessageProps) {
  const value = props.progress;
  return (
    <div className="todo-bg flex justify-center rounded-lg bg-primary p-6 lg:min-h-44 lg:py-8">
      <div className="flex flex-wrap gap-5 lg:flex-nowrap lg:gap-10">
        <div className="flex items-start gap-5">
          <div className="flex size-[91px] items-center justify-center rounded-full bg-transparent lg:bg-primary-200">
            <div className="highlight-bold flex size-14 items-center justify-center rounded-full bg-neutral-base_white text-primary">
              {value}%
            </div>
          </div>
          <div className="space-y-2 text-neutral-base_white lg:space-y-5">
            <h1 className="feature-bold">
              Verify your account to begin your investment and savings
            </h1>
            <p className="content-standard lg:max-w-[75%]">
              You are almost there, just follow the steps through and you will
              be ready to join the smart investors
            </p>
          </div>
        </div>
        <div className="w-1/ flex w-full justify-end lg:w-auto lg:self-end">
          <AppButton
            variant="ghost"
            onClick={props.continueBtn}
            className="w-1/2 bg-white text-primary lg:w-full"
          >
            Continue
          </AppButton>
        </div>
      </div>
    </div>
  );
});
