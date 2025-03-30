import useCustomNavigation from "@/hooks/use-navigation";
import ensureError from "@/lib/ensure-error";
import getNotificationSettings from "@/services/settings/notifications/get-notification-settings";
import updateNotificationSettings from "@/services/settings/notifications/update-notification-settings";
import { NotificationSettingsSection } from "@/types/notifications-settings.types";
import * as React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

const validation = z.object({
  notifications_from_admin: z.object({
    news_and_updates: z.boolean(),
    tips_and_tutorials: z.boolean(),
  }),
  login_notification: z.object({
    notify_me: z.boolean(),
  }),
  wallet_threshold: z.object({
    notify_me: z.boolean(),
  }),
});

type InitFormData = z.infer<typeof validation>;

export type NotificationTabsProps = {
  isLoading: boolean;
  edit: boolean;
  section: NotificationSettingsSection;
  formData: InitFormData;
  updateForm: <T extends keyof InitFormData, K extends keyof InitFormData[T]>(
    section: NotificationSettingsSection,
    objKey: T,
    field: K,
  ) => void;
};

const init: InitFormData = {
  notifications_from_admin: {
    news_and_updates: false,
    tips_and_tutorials: false,
  },
  login_notification: {
    notify_me: false,
  },
  wallet_threshold: {
    notify_me: false,
  },
};
export default function useNotifications() {
  const { queryParams } = useCustomNavigation();
  const [formData, setFormData] = React.useState<
    Record<NotificationSettingsSection, InitFormData>
  >({
    email: init,
    "in-app": init,
    push: init,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const isNotifications = React.useMemo(
    () => queryParams.has("tab", "notifications"),
    [queryParams],
  );

  const activeSubTab = React.useMemo(() => {
    return queryParams.get("sub_tab")?.trim() as keyof typeof formData;
  }, [queryParams]);

  const {
    isFetching,
    isError,
    error,
    data: _data,
  } = useQuery(["user-settings"], () => getNotificationSettings(), {
    enabled: isNotifications,
    onSuccess(data) {
      const getSection = (key: keyof typeof formData) => {
        const list = data.filter((item) => item.section === key)[0];

        if (!list) return { [key]: init };

        const sections = Object.entries(list)
          .filter(([_key]) => Object.keys(init).includes(_key))
          .map(([_key, value]) => [_key, value]);

        const converted = Object.fromEntries(sections);

        return {
          [key]: { ...init, ...converted },
        };
      };

      const updates = Object.keys(formData).reduce(
        (acc, key) => {
          const sectionUpdate = getSection(key as keyof typeof formData);
          return { ...acc, ...sectionUpdate };
        },
        {} as typeof formData,
      );

      setFormData(updates);
    },
  });

  const initFormData = (data: typeof _data) => {
    if (!data) return;

    const getSection = (key: keyof typeof formData) => {
      const list = data.filter((item) => item.section === key)[0];

      if (!list) return { [key]: init };

      const sections = Object.entries(list)
        .filter(([_key]) => Object.keys(init).includes(_key))
        .map(([_key, value]) => [_key, value]);

      const converted = Object.fromEntries(sections);

      return {
        [key]: { ...init, ...converted },
      };
    };

    const updates = Object.keys(formData).reduce(
      (acc, key) => {
        const sectionUpdate = getSection(key as keyof typeof formData);
        return { ...acc, ...sectionUpdate };
      },
      {} as typeof formData,
    );

    setFormData(updates);
  };
  const reset = () => {
    initFormData(_data);
    setEdit(false);
  };

  const updateForm = <
    T extends keyof InitFormData,
    K extends keyof InitFormData[T],
  >(
    section: keyof typeof formData,
    objKey: T,
    field: K,
  ) => {
    setFormData((prev) => {
      const sectionData = prev[section] as InitFormData;

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [objKey]: {
            ...sectionData[objKey],
            [field]: !sectionData[objKey][field],
          },
        },
      };
    });
  };

  const toggleEdit = (value: boolean) => {
    setEdit(value);
    if (!value) {
      reset();
    }
  };

  const click = (path: string) => {
    queryParams.set("sub_tab", path);
    reset();
  };

  const submit = async (section: keyof typeof formData) => {
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData[section]);
      await updateNotificationSettings({ ...formValues, section });
    } catch (error) {
      const errMsg = ensureError(error).message;
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    activeSubTab,
    isFetching,
    isError,
    error,
    edit,
    isLoading,
    formData,
    toggleEdit,
    updateForm,
    click,
    submit,
  };
}
