import { assets } from "@/constants";
import { SettingsTab } from "../data";

type SecurityTab = SettingsTab & {
  text: string;
  bg: string;
  bg_style: string;
};
export const securityTabs:SecurityTab[] = [
  {
    title: "Change Password",
    text: "Regularly Update your password to keep your account safe.",
    value: "change_password",
    bg_style: "",
    bg: assets.change_password_icon_01,
  },
  {
    title: "Security Questions",
    text: "Add an extra layer of protection to your account by setting up personalised security questions",
    value: "security_questions",
    bg_style: "",
    bg: assets.security_questions_icon_01,
  },
  {
    title: "Transaction Pin",
    text: "Secure your transactions with a 4-Digit PIN",
    value: "transaction_pin",
    bg_style: "",
    bg: assets.transaction_pin_icon_01,
  },
  {
    title: "Two Factor Authentication",
    text: "Activate 2FA for enhanced security, ensuring that only you have access to your account",
    value: "2fa",
    bg_style: "",
    bg: assets.two_factory_auth_icon_01,
  },
];
