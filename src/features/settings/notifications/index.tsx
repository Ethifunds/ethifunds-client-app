import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContainer from "../tab-container";
import * as React from "react";
import { notificationTabs } from "./data";
import useNotifications from "./use-notifications";
import AppButton from "@/components/app-button";
import Render from "@/components/render";
import NotificationTabs from "./tabs";

export default React.memo(function Notifications() {
  const {
    activeSubTab,
    isFetching,
    isError,
    error,
    edit,
    formData,
    isLoading,
    toggleEdit,
    updateForm,
    click,
    submit,
  } = useNotifications();

  return (
    <TabContainer
      value="notifications"
      title="Notifications"
      subTitle="We may still send you important notifications about your account outside of your notification settings."
      className="space-y-5"
      utilityComponent={
        <div className="flex justify-between gap-5 pt-5 lg:w-1/5">
          {edit && (
            <AppButton
              variant="mute"
              className="w-full"
              onClick={() => toggleEdit(false)}
            >
              Reset
            </AppButton>
          )}

          <AppButton
            variant="primary"
            className="w-full"
            onClick={() => (edit ? submit(activeSubTab) : toggleEdit(true))}
            isLoading={isLoading}
          >
            {edit ? "Save" : "Edit"}
          </AppButton>
        </div>
      }
    >
      <Tabs
        defaultValue={activeSubTab ?? "email"}
        value={activeSubTab ?? "email"}
        className="flex flex-col lg:w-3/5 lg:gap-5"
      >
        <TabsList className="hide-scrollbar w-full justify-start gap-2 overflow-x-auto overflow-y-hidden rounded-none border-b-2 bg-transparent !p-0 !pb-3 lg:gap-5 lg:border-b">
          {notificationTabs.map((item, idx) => {
            return (
              <TabsTrigger
                key={idx}
                value={item.value}
                onClick={() => click(item.value)}
                className="content-standard hover:content-bold data-[state=active]:content-bold justify-start !rounded-none border-b-2 border-transparent !bg-transparent px-2 py-4 capitalize text-neutral-500 !shadow-none first:pl-0 hover:border-primary hover:text-primary data-[state=active]:border-primary data-[state=active]:!text-primary"
              >
                {item.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <Render isLoading={isFetching} isError={isError} error={error}>
          <NotificationTabs
            isLoading={isLoading}
            edit={edit}
            formData={formData[activeSubTab ?? "email"]}
            updateForm={updateForm}
            section={activeSubTab}
          />
        </Render>
      </Tabs>
    </TabContainer>
  );
});
