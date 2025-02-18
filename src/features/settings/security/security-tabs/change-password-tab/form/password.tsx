import { Input } from "@/components/ui/form-input";
import classNames from "classnames";
import * as React from "react";

type PasswordProps = {
  label: string;
  name: string;
  value: string;
  updateForm(e: React.ChangeEvent<HTMLInputElement>): void;
  isLoading: boolean;
};

export default React.memo(function Password({
  name,
  label,
  value,
  updateForm,
  isLoading,
}: PasswordProps) {
  const checks = React.useMemo(
    () => [
      {
        check: (t: string) => t.length >= 8,
        message: "Minimum of 8 characters",
      },
      {
        check: (t: string) => /[A-Z]/.test(t) && /[a-z]/.test(t),
        message: "uppercase and lower case",
      },

      {
        check: (t: string) => /[!@#$%^&*(),.?":{}|<>]/.test(t),
        message: "must contain number and special character e.g @#$%^&)",
      },
    ],
    [],
  );

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
        placeholder="Enter New password"
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
