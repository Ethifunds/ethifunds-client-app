import NotificationCard from "./notification-card";
import { useAppSelector } from "@/store/hooks";

export default function NotificationList() {
  const { notifications } = useAppSelector((state) => state.notification);

  return (
    <div className="p-4 space-y-3 overflow-auto">
      {notifications.map((item) => (
        <NotificationCard key={item.id} {...item} />
      ))}
    </div>
  );
}
