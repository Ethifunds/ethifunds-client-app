import AppButton from "@/components/app-button";
import { Input } from "@/components/ui/form-input";
import ensureError from "@/lib/ensure-error";
import { sanitizeNumInput } from "@/lib/sanitize-num-input";
import setTransactionPin from "@/services/account/set-transaction-pin";
import useActions from "@/store/actions";
import { useAppSelector } from "@/store/hooks";
import * as React from "react";
import { z } from "zod";

const validation = z.object({
  pin: z.string().trim().length(4, "Pin is Required"),
  confirm_pin: z.string().trim().length(4, "Confirm Pin is Required"),
});

type FormData = z.infer<typeof validation>;

const init: FormData = {
  pin: "",
  confirm_pin: "",
};

export default React.memo(function SetPinForm() {
  const { account } = useAppSelector((state) => state.account);
  const [formData, setFormdata] = React.useState(init);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  const { account: accountActions, ui } = useActions();

  const reset = () => {
    setFormdata(init);
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numericValue = sanitizeNumInput(value);

    setErrMsg("");
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
    setErrMsg("");
    if (formData.pin !== formData.confirm_pin) {
      setErrMsg("Both Pins must match");
      return;
    }

    try {
      setIsLoading(true);
      const formValues = validation.parse(formData);
      await setTransactionPin(formValues);
      accountActions.updateAccount({
        ...account,
        has_set_pin: true,
        user_verifications: {
          ...account.user_verifications,
        },
      });

      successDialog();

      reset();
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
      className="flex flex-col space-y-5 pt-10 lg:w-1/2"
    >
      {errMsg && (
        <p className="shake-animation rounded bg-error-100/20 px-2 text-center text-error-200">
          {errMsg}
        </p>
      )}
      <Input
        name="pin"
        label="Transaction Pin"
        type="password"
        hideIcon
        maxLength={4}
        placeholder="Enter Pin"
        value={formData.pin}
        onChange={updateForm}
        disabled={isLoading}
        overrideInvalid={errMsg.length > 0}
      />

      <Input
        name="confirm_pin"
        label="Confirm Transaction Pin"
        type="password"
        hideIcon
        maxLength={4}
        placeholder="Enter Pin"
        value={formData.confirm_pin}
        onChange={updateForm}
        disabled={isLoading}
        overrideInvalid={errMsg.length > 0}
      />

      <AppButton
        variant="primary"
        className="rounded-lg"
        type="submit"
        isLoading={isLoading}
      >
        Save
      </AppButton>
    </form>
  );
});
