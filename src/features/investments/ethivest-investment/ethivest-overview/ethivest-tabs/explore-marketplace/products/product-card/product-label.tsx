import { Badge } from "@/components/ui/badge";

export default function ProductLabel(props: { label: string }) {
  if(!props.label) return null;
  return (
    <Badge className="capitalize bg-success-200/30 text-success-300">
      {props.label}
    </Badge>
  );
}
