import {
  Notification,
  NotificationDataTypes,
} from "@/types/notification.types";
import NotificationIcon from "./notification-icon";
import { ChevronRight } from "lucide-react";
import classNames from "classnames";
import useActions from "@/store/actions";
import React from "react";
import markNotificationAsRead from "@/services/notifications/mark-as-read";
import { toast } from "sonner";

export default function NotificationCard(props: Notification) {
  const { notification } = useActions();
  const date = new Date(props.created_at);



  const markAsRead = React.useCallback(async (id: string) => {
    try {
      await markNotificationAsRead({ id });
      notification.markIsRead({ id: Number(id) });
    } catch (err) {
      toast.warning("failed to mark this notification as read");
      throw err;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const showDetails = () => {
    const data = props.data;

    // Find the key that corresponds to NotificationDataTypes
    const type = Object.keys(data).find((key): key is NotificationDataTypes =>
      ["user_savings", "product", "listing", "user_investment"].includes(key),
    );

    notification.changeNotificationDialog({
      id: props.id.toString(),
      data,
      type: type ?? "info",
    });

    markAsRead(props.id.toString());
  };

  const title = (props as any).data?.title ?? "";
  const message =
    (props as any).data?.message ?? (props as any).data?.description;
  const msgCn = classNames(
    "first-letter:uppercase line-clamp-1 text-neutral-900",
    {
      "!text-neutral-600": props.read_at && !title,
      "content-accent": !title,
      "content-standard": title,
    },
  );

  const titleCn = classNames("capitalize line-clamp-1 content-accent", {
    "!text-neutral-600": props.read_at,
  });

  return (
    <div className="flex items-start gap-3 border-b border-neutral-200 py-2">
      <NotificationIcon type={(props as any).type} />
      <div className="flex grow flex-col gap-2">
        {title && <h1 className={titleCn}>{title}</h1>}
        <p className={msgCn}>{message}</p>
        <div className="content-standard flex w-full items-center justify-between text-neutral-700">
          <span className="caption-standard">
            {date.toLocaleDateString("en-us", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            {date.toLocaleTimeString("en-us", {
              timeStyle: "short",
            })}
          </span>

          <button className="flex items-center" onClick={showDetails}>
            <span> View</span> <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
