import * as React from "react";
import classnames from "classnames";
import { assets } from "@/constants";

type EmptyDataProps = {
  title?: string;
  text?: string;
  icon?: string;
  className?: string;
};
export default React.memo(function EmptyData(props: EmptyDataProps) {
  const container = classnames(
    "w-full h-full flex col-span-full flex-col items-center justify-center",
    props.className,
  );
  return (
    <div className={container}>
      <img
        src={props.icon ?? assets.empty_01}
        alt="empty-icon"
        className="size-24"
      />
      {props.title && (
        <h1 className="feature-accent text-neutral-1000">{props.title}</h1>
      )}
      <p className="text-center font-semibold tracking-tight text-neutral-500">
        {props.text ?? "No Data available"}
      </p>
    </div>
  );
});

