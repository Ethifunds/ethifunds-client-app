import { Input } from "@/components/ui/form-input";
import { passwordValidations } from "@/constants/password-validations";
import classNames from "classnames";
import * as React from "react";

type PasswordProps = {
  value: string;
  updateForm(e: React.ChangeEvent<HTMLInputElement>): void;
  isLoading: boolean;
  name: string;
  label: string;
  placeholder: string;
};

export default React.memo(function Password({
  value,
  updateForm,
  isLoading,
  name,
  label,
  placeholder,
}: PasswordProps) {
  const checks = React.useMemo(() => passwordValidations, []);

  const validations = React.useMemo(
    () => checks.map((item) => item.check(value)),
    [value, checks],
  );

  const isValid = React.useMemo(() => {
    return validations.some((val) => val === false) && value.length > 0;
  }, [value, validations]);

  return (
    <div className="space-y-2">
      <Input
        name={name}
        type="password"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={updateForm}
        disabled={isLoading}
        overrideInvalid={isValid}
        invalid={isValid}
        required
      />
      <div className="flex flex-wrap gap-2">
        {checks.map((item, idx) => {
          const cn = classNames("px-3 py-1 rounded text-xs font-medium", {
            "bg-neutral-100 text-neutral-900": value.length === 0, // Neutral state
            "bg-success-200/10 text-success-200": validations[idx], // Valid state
            "bg-error-100/10 text-error-200 shake-animation":
              !validations[idx] && value.length > 0, // Invalid state
          });

          if (validations[idx]) return;
          return (
            <small key={idx} className={cn}>
              {item.message}
            </small>
          );
        })}
      </div>
    </div>
  );
});
