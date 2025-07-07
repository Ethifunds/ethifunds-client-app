import { Input } from "@/components/ui/form-input";
import { supportedAuthApps } from "./data";
import AppButton from "@/components/app-button";
import { assets } from "@/constants";
import PinInput from "@/components/ui/form-input/otp-input";
import useForm from "./use-form";
import QrCode from "./qr-code";
import { QrCodeIcon } from "lucide-react";

export default function Form() {
  const {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    formData,
    copy,
    reset,
    showQrCode,
    updateForm,
    submit,
  } = useForm();

  return (
    <div className="justify-between items-start lg:flex">
      <div className="space-y-8 lg:w-3/5">
        <ol className="px-5 space-y-5 list-decimal content-standard text-neutral-700">
          <li>
            {" "}
            You will need an authenticator mobile app to complete this process,
            such as one of the following:
            <ul className="mt-3 space-y-3">
              {supportedAuthApps.map((item, idx) => (
                <li key={idx} className="caption-standard">
                  {item.name}
                </li>
              ))}
            </ul>
          </li>

          <li className="flex flex-col w-full lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1">
              <h6>Scan the QR code with your authenticator</h6>
              <span className="caption-standard">
                If you can’t scan the code, you can enter the secret key into
                your authenticator app
              </span>
              <div className="flex flex-col gap-5 justify-between items-end lg:flex-row">
                <Input
                  name="secret"
                  value={data?.secret ?? ""}
                  className="border !border-primary"
                  containerStyle="[&_label]:!text-sm grow"
                  disabled
                  readOnly
                />
                <div className="flex justify-between w-full lg:w-auto">
                  <AppButton
                    variant="outline"
                    className="flex justify-center items-center p-2 min-w-36 border-primary text-primary active:text-neutral-base_white lg:hidden"
                    leftIcon={<QrCodeIcon />}
                    onClick={showQrCode}
                    disabled={isLoading || isFetching}
                  >
                    Show QR Code
                  </AppButton>
                  <AppButton
                    variant="primary"
                    className="flex justify-center items-center p-2 w-32 lg:w-24 lg:max-w-60"
                    leftIcon={<img src={assets.copy_icon_02} alt="copy-icon" />}
                    onClick={copy}
                    disabled={isLoading || isFetching}
                  >
                    Copy
                  </AppButton>
                </div>
              </div>
            </div>
          </li>

          <li>
            After scanning the QR code above, enter the six-digit code generated
            by your authenticator
            <PinInput
              value={formData.token}
              onChange={(e) => updateForm("token", e)}
              valueLength={6}
              inputClass="!size-12"
              containerStyle="!justify-start mt-1"
            />
          </li>
        </ol>

        <div className="flex gap-5 justify-between lg:px-5">
          <AppButton
            variant="mute"
            onClick={reset}
            disabled={isLoading}
            className="w-full bg-neutral-100"
          >
            Reset
          </AppButton>

          <AppButton
            variant="primary"
            onClick={submit}
            isLoading={isLoading}
            className="w-full"
          >
            Verify
          </AppButton>
        </div>
      </div>

      <div className="hidden lg:block lg:size-[400px]">
        <QrCode
          isFetching={isFetching}
          isError={isError}
          error={error}
          data={data}
        />
      </div>
    </div>
  );
}
