import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type TooltipProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
};

export default function AppTooltip(props: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.trigger}</TooltipTrigger>
        <TooltipContent asChild>{props.content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
