export type AccountStatus = "active" | "inactive";

export type User = {
	id: number;
	username: string;
	email: string;
	phone_number: string;
	last_login: string| null;
	login_attempt_count: 0;
	status: AccountStatus;
	remark: string | null;
	locked_until: string | null;
	profile_picture: string | null;
	email_verified_at: string | null;
	user_verifications: UserVerification;
	user_profile: UserProfile | null;
	two_factor:TwoFactor| null
	created_at: string;
	updated_at: string;
};

export type UserVerification = {
	id: number;
	user_id: number;
	has_verified_email: boolean;
	email_verified_at: string;
	has_set_pin:boolean
	has_verified_phone: boolean;
	phone_verified_at: string;
	has_verified_bvn: boolean;
	bvn_verified_at: string | null;
	has_verified_nin: boolean;
	nin_verified_at: string | null;
	has_verified_address: boolean;
	address_verified_at: string | null;
	has_proof_of_income: boolean;
	proof_of_income_verified_at: string | null;
	has_verified_liveliness: boolean;
	liveliness_verified_at: string | null;
	created_at: string;
	updated_at: string;
};

export type TwoFactor = {
	id: number;
	user_id: number;
	"2fa_type": string;
	is_active: number;
	qrcode: string | null;
	created_at: string;
	updated_at: string;
};

export type UserProfile = {
  id: number;
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  occupation: string;
  income_level: string;
  referral_code: string;
  residential_address: string |null;
  gender: string;
  referred_by: number;
  user_tag: string;
  created_at: string;
  updated_at: string;
};
