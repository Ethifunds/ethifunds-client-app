export const passwordValidations = [
  {
    check: (t: string) => t.length >= 8,
    message: "Minimum of 8 characters",
  },
  {
    check: (t: string) => /\d/.test(t),
    message: "Must contain at least one number",
  },
  {
    check: (t: string) => /[A-Z]/.test(t) && /[a-z]/.test(t),
    message: "Must contain uppercase and lowercase letters",
  },
  {
    check: (t: string) => /[!@#$%^&*(),.?":{}|<>]/.test(t),
    message: "Must contain at least one special character e.g. @#$%^&)",
  },
];
