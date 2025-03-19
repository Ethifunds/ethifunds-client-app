import AppButton from "@/components/app-button";
import { assets } from "@/constants";


type NoActiveSavingsProps = {
  open(): void;
};
export default function NoActiveSavings(props: NoActiveSavingsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <img src={assets.empty_investment} alt="bank icon" className="size-20" />

      <div className="flex flex-col items-center gap-3">
        <h1 className="highlight-accent text-neutral-1000">
          You don't any Active Savings Cycle
        </h1>
        <span className="caption-standard text-neutral-500">
          No active cycle yet, active savings cycle to begin.
        </span>
      </div>
      <AppButton
        variant="primary"
        onClick={props.open}
        className="flex items-center gap-3 rounded-lg"
      >
        <span>Activate Savings Cycle </span>
      </AppButton>
    </div>
  );
}
