import * as React from "react";
import classnames from "classnames";

type EmptyDataProps = {
  text?: string
  className?: string
}
export default React.memo(function EmptyData(props: EmptyDataProps) {
  const container = classnames("w-full h-full flex items-center justify-center", props.className)
  return (
    <div className={container}>
      <p className="font-bold tracking-tight">
        {props.text ?? "Requested Data Unavailable"}
      </p>
    </div>
  )
});

