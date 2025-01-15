export type AccountStatus = "active" | "inactive";

export type User = {
	id: string;
	name: string;
	username: string;
	email: string;
	phone_number: string;
	last_login: string;
	login_attempt_count: 0;
	status: AccountStatus;
	remark: string | null;
	locked_until: string | null;
	profile_picture: string | null;
	email_verified_at: string | null;
	two_factory_auth_enabled: boolean;
	created_at: string;
	updated_at: string;
};
