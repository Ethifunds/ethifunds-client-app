import * as React from "react";
import LoadingBox from "./loading-box";
import ErrorBox from "./error-box";

type RenderProps = {
  children?: any
  isError?: boolean
  error?: unknown
  loadingComponent?: React.ReactNode | (() => React.ReactNode) | ((...args: any[]) => React.ReactNode)
  loadingComponentArgs?: any[]
  errorComponent?: React.ReactNode
  isLoading?: boolean
  roundedBg?: boolean
  size?: "sm" | "md" | "lg"
}

export default React.memo(function Render(props: RenderProps) {
  const {
    children,
    isLoading = false,
    isError = false,
    error,
    errorComponent,
    loadingComponent,
    size = "sm",
    roundedBg = false
  } = props;
  if (isLoading) {
    if (loadingComponent) {
      if (typeof loadingComponent === "function") return loadingComponent(...props?.loadingComponentArgs ?? []);
      return loadingComponent
    } else return <LoadingBox classNames={roundedBg ? "rounded-xl" : ""} spinnerSize={size} />
  }
  if (isError) {
    if (errorComponent) return errorComponent
    else return <ErrorBox error={error} />
  }
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
});

