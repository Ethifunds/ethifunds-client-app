import LoginPage from "@/pages/authentication/login";
import RecoveryPage from "@/pages/authentication/recovery";
import RecoverSecurityPage from "@/pages/authentication/recovery-security";
import RecoveryVerifyEmailPage from "@/pages/authentication/recovery-verify-email";
import ResetPasswordPage from "@/pages/authentication/reset-password";
import ResetPasswordSuccessPage from "@/pages/authentication/reset-password-success";
import SignUpPage from "@/pages/authentication/sign-up";
import TwoFactoryAuthPage from "@/pages/authentication/two-factory-auth";
import VerifyEmailPage from "@/pages/authentication/verify-email";
import { RouteProps } from "react-router-dom";

type CustomRouteProps = RouteProps & {};

const authRoutes: CustomRouteProps[] = [
	{ index: true, Component: LoginPage },
	{ path: "/2fa-verify", Component: TwoFactoryAuthPage },
	{ path: "/sign-up", Component: SignUpPage },
	{ path: "/verify-email", Component: VerifyEmailPage },
	{ path: "/recovery", Component: RecoveryPage },
	{ path: "/recovery/verify-email", Component: RecoveryVerifyEmailPage },
	{ path: "/recovery/security", Component: RecoverSecurityPage },
	{ path: "/recovery/reset-password", Component: ResetPasswordPage },
	{ path: "/recovery/reset-password/success", Component: ResetPasswordSuccessPage },
];

export default authRoutes;
