import AppButton from "@/components/app-button";
import { Input } from "@/components/ui/form-input";
import ensureError from "@/lib/ensure-error";
import { sanitizeNumInput } from "@/lib/sanitize-num-input";
import changeTransactionPin from "@/services/account/change-transaction-pin";
import useActions from "@/store/actions";
import * as React from "react";
import { z } from "zod";

const validation = z.object({
  old_pin: z.string().trim().length(4, "Old Pin is Required"),
  new_pin: z.string().trim().length(4, "New Pin is Required"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  old_pin: "",
  new_pin: "",
};

export default React.memo(function ChangePinForm() {
  const [formData, setFormdata] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const { ui } = useActions();
  const reset = () => {
    setFormdata(init);
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrMsg("");

    const numericValue = sanitizeNumInput(value);

    setFormdata((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const successDialog = () => {
    const data = {
      title: "Congratulations!!!",
      subtitle: "Your transaction pin has been set successfully. ",
      btnText: "Dismiss",
    };
    ui.changeDialog({
      show: true,
      type: "success_dialog",
      data,
      action: reset,
    });
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const formValues = validation.parse(formData);
      await changeTransactionPin(formValues);
      successDialog();
    } catch (error) {
      const err = ensureError(error);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col pt-10 space-y-5 lg:w-1/2"
    >
      {errMsg && (
        <p className="px-2 text-center rounded shake-animation bg-error-100/20 text-error-200">
          {errMsg}
        </p>
      )}
      <Input
        name="new_pin"
        label="New Pin"
        type="password"
        hideIcon
        maxLength={4}
        placeholder="Enter New Pin"
        value={formData.new_pin}
        onChange={updateForm}
        disabled={isLoading}
        overrideInvalid={errMsg.length > 0}
      />

      <Input
        name="old_pin"
        label="Old Pin"
        type="password"
        hideIcon
        maxLength={4}
        placeholder="Enter Old Pin"
        value={formData.old_pin}
        onChange={updateForm}
        disabled={isLoading}
        overrideInvalid={errMsg.length > 0}
      />

      <AppButton
        type="submit"
        variant="primary"
        className="rounded-lg"
        isLoading={isLoading}
      >
        Save
      </AppButton>
    </form>
  );
});
