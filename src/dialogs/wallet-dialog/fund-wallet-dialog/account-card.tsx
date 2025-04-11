import { assets } from "@/constants";
import { VirtualAccount } from "@/types/wallet.types";

export default function AccountCard(
  props: VirtualAccount & { copy(text: string): Promise<void> },
) {
  const data = {
    bank_name: props.bank_name,
    bank_account_number: props.account_number,
    beneficiary_name: props.account_name,
  };

  const copy = async () => {
    props.copy(props.account_number);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border p-2">
      {Object.entries(data).map(([key, value]) => {
        const isAccountNumber = key === "bank_account_number" && true;
        return (
          <div
            key={key}
            className="flex items-center justify-between border-b px-3 py-3 capitalize last:border-b-0 [&_span]:w-full"
          >
            <span className="caption-standard text-neutral-500">
              {key.split("_").join(" ")}:
            </span>
            {isAccountNumber ? (
              <div className="flex items-center gap-2 px-3">
                <span className="content-accent text-neutral-1000">
                  {value}
                </span>
                <button
                  onClick={copy}
                  className="button-ghost flex items-center gap-2 !p-0 hover:scale-105"
                >
                  <img src={assets.copy_icon_01} alt="copy-icon" />
                  <span>Copy</span>
                </button>
              </div>
            ) : (
              <span className="content-accent text-right text-neutral-1000">
                {value.toLocaleLowerCase()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
