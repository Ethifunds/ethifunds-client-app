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
    <div className="items-start justify-between lg:flex">
      <div className="space-y-8 lg:w-3/5">
        <ol className="content-standard list-decimal space-y-5 px-5 text-neutral-700">
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

          <li className="flex w-full flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1">
              <h6>Scan the QR code with your authenticator</h6>
              <span className="caption-standard">
                If you can’t scan the code, you can enter the secret key into
                your authenticator app
              </span>
              <div className="flex flex-col items-end justify-between gap-5 lg:flex-row">
                <Input
                  name="secret"
                  value={data?.secret ?? ""}
                  className="border !border-primary"
                  containerStyle="[&_label]:!text-sm grow"
                  disabled
                  readOnly
                />
                <div className="flex w-full justify-between lg:w-auto">
                  <AppButton
                    variant="outline"
                    className="flex min-w-36 items-center justify-center border-primary p-2 text-primary active:text-neutral-base_white lg:hidden"
                    leftIcon={<QrCodeIcon />}
                    onClick={showQrCode}
                    disabled={isLoading || isFetching}
                  >
                    Show QR Code
                  </AppButton>
                  <AppButton
                    variant="primary"
                    className="flex w-32 items-center justify-center p-2 lg:w-24 lg:max-w-60"
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

        <div className="flex justify-between gap-5 lg:px-5">
          <AppButton
            variant="mute"
            onClick={reset}
            disabled={isLoading}
            className="w-full bg-neutral-100"
          >
            Rest
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
