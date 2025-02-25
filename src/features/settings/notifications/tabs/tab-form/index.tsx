import * as React from "react";
import { NotificationTabsProps } from "../../use-notifications";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default React.memo(function TabForm(props: NotificationTabsProps) {
  const form = props.formData;
  return (
    <form className="space-y-5">
      <FormSectionContainer
        title="Notifications from us"
        text="Receive the latest news, updates and industry tutorials from us."
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-5">
            <Checkbox
              name="news_and_updates"
              checked={form?.notifications_from_admin?.news_and_updates}
              onClick={() =>
                props.updateForm(
                  props.section,
                  "notifications_from_admin",
                  "news_and_updates",
                )
              }
              disabled={props.isLoading || !props.edit}
            />
            <div className="caption-standard">
              <h5 className="text-neutral-700">News and updates</h5>
              <span className="text-neutral-500">
                News about our product and feature updates.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <Checkbox
              name="tips_and_tutorials"
              checked={form?.notifications_from_admin?.tips_and_tutorials}
              onClick={() =>
                props.updateForm(
                  props.section,
                  "notifications_from_admin",
                  "tips_and_tutorials",
                )
              }
              disabled={props.isLoading || !props.edit}
            />
            <div className="caption-standard">
              <h5 className="text-neutral-700">Tips and tutorials</h5>
              <span className="text-neutral-500">
                Tips on getting more out of Ethifunds
              </span>
            </div>
          </div>
        </div>
      </FormSectionContainer>

      <FormSectionContainer
        title="Login Notification"
        text="Receive security alerts every time you login"
      >
        <div className="caption-standard flex flex-col gap-5 text-neutral-700">
          <RadioGroup
            defaultValue={
              form?.login_notification.notify_me ? "notify-me" : "don't-notify"
            }
            value={
              form?.login_notification.notify_me ? "notify-me" : "don't-notify"
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="notify-me"
                id="login_notification_notify-me"
                onClick={() =>
                  props.updateForm(
                    props.section,
                    "login_notification",
                    "notify_me",
                  )
                }
                className={`${form?.login_notification.notify_me ? "border-primary" : ""} `}
                disabled={props.isLoading || !props.edit}
              />
              <label htmlFor="login_notification_notify-me">Notify Me</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="don't-notify"
                id="login_notification_don't-notify"
                onClick={() =>
                  props.updateForm(
                    props.section,
                    "login_notification",
                    "notify_me",
                  )
                }
                className={`${!form?.login_notification.notify_me ? "border-primary" : ""} `}
                disabled={props.isLoading || !props.edit}
              />
              <label htmlFor="login_notification_don't-notify">
                Do not notify me
              </label>
            </div>
          </RadioGroup>
        </div>
      </FormSectionContainer>

      <FormSectionContainer
        title="Wallet threshold"
        text="These are notifications to remind you when your wallet balance is low."
      >
        <div className="caption-standard flex flex-col gap-5 text-neutral-700">
          <RadioGroup
            defaultValue={
              form?.wallet_threshold.notify_me ? "notify-me" : "don't-notify"
            }
            value={
              form?.wallet_threshold.notify_me ? "notify-me" : "don't-notify"
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="notify-me"
                id="wallet_threshold_notify-me"
                onClick={() =>
                  props.updateForm(
                    props.section,
                    "wallet_threshold",
                    "notify_me",
                  )
                }
                className={`${form?.wallet_threshold.notify_me ? "border-primary" : ""} `}
                disabled={props.isLoading || !props.edit}
              />
              <label htmlFor="wallet_threshold_notify-me">Notify Me</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="don't-notify"
                id="wallet_threshold_don't-notify"
                onClick={() =>
                  props.updateForm(
                    props.section,
                    "wallet_threshold",
                    "notify_me",
                  )
                }
                className={`${!form?.wallet_threshold.notify_me ? "border-primary" : ""} `}
                disabled={props.isLoading || !props.edit}
              />
              <label htmlFor="wallet_threshold_don't-notify">
                Do not notify me
              </label>
            </div>
          </RadioGroup>
        </div>
      </FormSectionContainer>
    </form>
  );
});

function FormSectionContainer(props: {
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h5 className="caption-accent text-neutral-700"> {props.title}</h5>
        <span className="caption-standard text-neutral-500">{props.text} </span>
      </div>

      {props.children}
      <Separator />
    </div>
  );
}
