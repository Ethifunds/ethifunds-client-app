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
    SYSTEM_NOTIFICATION: <Settings {...iconUtils} />,
    PROMOTIONAL_NOTIFICATION: <Megaphone {...iconUtils} />,
    ACCOUNT_NOTIFICATION: <User {...iconUtils} />,
    TRANSACTIONS_NOTIFICATION: <ArrowLeftRight {...iconUtils} />,
    INVESTMENT_OFFER_NOTIFICATION: <TrendingUp {...iconUtils} />,
    INVESTMENT_TRANSACTIONS_NOTIFICATION: <TrendingUp {...iconUtils} />,
    ADMIN_NOTIFICATION: <User {...iconUtils} />,
  };

  return (
    <Badge className="flex items-center justify-center rounded-full size-10 bg-primary-100">
      {icons[props.type]}{" "}
    </Badge>
  );
});
