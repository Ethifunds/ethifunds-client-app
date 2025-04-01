import ErrorBoundary from "@/components/error-boundary";
import useForm from "./use-form";
import { Input } from "@/components/ui/form-input";
import Spinner from "@/components/spinner";
import AppButton from "@/components/app-button";
import SelectBank from "@/components/select.bank";


export type FormProps = {
  toggleDrawer: (value: boolean) => void;
  open:boolean
};

export default function Form(props: FormProps) {
  const {
    isLoading,
    validating,
    formData,
    bankList,
    submitRef,
    formChange,
    selectBank,
    submit,
  } = useForm(props);
  return (
    <ErrorBoundary>
      <div className="h-svh lg:h-screen">
        <div className="mt-10 flex h-full flex-col space-y-5 overflow-auto px-5">
          <h1 className="content-standard text-neutral-500">
            Add your bank account to securely withdraw funds from your Ethifunds
            Wallet
          </h1>
          <div className="flex flex-col gap-5">
            <Input
              name="account_number"
              inputMode="numeric"
              label={"Account Number"}
              value={formData.account_number}
              placeholder="Enter Account Number"
              onChange={formChange}
              disabled={isLoading || validating}
            />
            <SelectBank
              value={formData.bank_code}
              changeForm={selectBank}
              bankList={bankList}
              disabled={
                isLoading ||
                validating ||
                bankList.length < 1 ||
                !formData.account_number
              }
            />
            {validating ? (
              <Spinner load_type="simple" />
            ) : (
              formData.name && <Input value={formData.name} readOnly />
            )}
          </div>
          <div
            ref={submitRef}
            className="flex grow flex-col justify-end gap-10 pb-10"
          >
            <AppButton
              onClick={submit}
              isLoading={isLoading}
              variant="primary"
              className="highlight-accent w-full text-neutral-base_white"
              disabled={isLoading || validating}
            >
              Save Bank Account
            </AppButton>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
