import { Badge } from "@/components/ui/badge";

export default function ProductLabel(props: { label: string }) {
  return (
    <Badge className="bg-success-200/30 capitalize text-success-300">
      {props.label}
    </Badge>
  );
}
