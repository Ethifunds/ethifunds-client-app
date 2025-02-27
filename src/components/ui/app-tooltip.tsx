import React from "react";
import classNames from "classnames";

type TooltipProps = {
  trigger: React.ReactNode;
  title?: string;
  content: string;
  contentClassNames?: string;
};

export default function AppTooltip(props: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const contentClx = classNames(
    "[&_p]:caption-standard [&_h6]:caption-accent text-neutral-1000 absolute bottom-full i z-50 w-max max-w-[330px] overflow-hidden rounded-md border border-stone-200 bg-primary-100 px-3 py-1.5 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    props.contentClassNames,
    {
      "opacity-0 invisible": !isVisible,
      "opacity-100 visible": isVisible,
    },
  );

  return (
    <div
      className="relative inline-block "
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div>{props.trigger}</div>

      <div className={contentClx} data-state={isVisible ? "open" : "closed"}>
        {props.title && <h6>{props.title}</h6>}

        <p>{props.content}</p>
      </div>
    </div>
  );
}
