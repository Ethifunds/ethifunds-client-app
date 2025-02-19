import * as React from "react";
import classnames from "classnames";
import { assets } from "@/constants";

type EmptyDataProps = {
  text?: string;
  className?: string;
};
export default React.memo(function EmptyData(props: EmptyDataProps) {
  const container = classnames(
    "w-full h-full flex  flex-col items-center justify-center",
    props.className,
  );
  return (
    <div className={container}>
      <img src={assets.empty_01} alt="empty-icon" className="size-24" />
      <p className="font-bold tracking-tight text-neutral-500 text-center">
        {props.text ?? "No Data available"}
      </p>
    </div>
  );
});

