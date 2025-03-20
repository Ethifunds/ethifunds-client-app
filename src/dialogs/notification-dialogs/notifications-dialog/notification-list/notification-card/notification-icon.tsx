import { Badge } from "@/components/ui/badge";
import { NotificationType } from "@/types/notification.types";
import {
  ArrowLeftRight,
  Megaphone,
  Settings,
  TrendingUp,
  User,
} from "lucide-react";
import * as React from "react";

type IconProps = {
  type: NotificationType;
};

export default React.memo(function NotificationIcon(props: IconProps) {
  const iconUtils = {
    color: "#e4932b",
    size: 20,
  };
  const icons: Record<NotificationType, any> = {
    SYSTEM: <Settings {...iconUtils} />,
    PROMOTIONAL: <Megaphone {...iconUtils} />,
    ACCOUNT: <User {...iconUtils} />,
    TRANSACTIONS: <ArrowLeftRight {...iconUtils} />,
    INVESTMENT_OFFERS: <TrendingUp {...iconUtils} />,
    INVESTMENT_TRANSACTIONS: <TrendingUp {...iconUtils} />,
  };

  return (
    <Badge className="flex size-10 grow items-center justify-center rounded-full bg-primary-100">
      {icons[props.type]}{" "}
    </Badge>
  );
});
