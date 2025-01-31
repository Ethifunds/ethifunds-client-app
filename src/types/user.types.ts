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
	gender: string;
	referred_by: number;
	user_tag: string;
	created_at: string;
	updated_at: string;
};

// "data": {
//         "id": 1,
//         "username": "echovick",
//         "email": "uchechukwueze70@gmail.com",
//         "phone_number": "08131117279",
//         "last_login": null,
//         "login_attempt_count": 0,
//         "status": "active",
//         "remark": null,
//         "locked_until": null,
//         "profile_picture": null,
//         "email_verified_at": null,
//         "created_at": "2025-01-23T23:32:15.000000Z",
//         "updated_at": "2025-01-23T23:32:15.000000Z",
//         "user_verifications": {
//             "id": 1,
//             "user_id": 1,
//             "has_verified_email": true,
//             "email_verified_at": "2025-01-23T23:33:25.000000Z",
//             "has_verified_phone": true,
//             "phone_verified_at": "2025-01-23T23:34:47.000000Z",
//             "has_verified_bvn": false,
//             "bvn_verified_at": null,
//             "has_verified_nin": false,
//             "nin_verified_at": null,
//             "has_verified_address": false,
//             "address_verified_at": null,
//             "has_proof_of_income": false,
//             "proof_of_income_verified_at": null,
//             "has_verified_liveliness": false,
//             "liveliness_verified_at": null,
//             "created_at": "2025-01-23T23:32:15.000000Z",
//             "updated_at": "2025-01-23T23:34:47.000000Z"
//         },
//         "two_factor": {
//             "id": 1,
//             "user_id": 1,
//             "2fa_type": "google",
//             "is_active": 1,
//             "qrcode": null,
//             "created_at": "2025-01-23T23:58:32.000000Z",
//             "updated_at": "2025-01-23T23:58:32.000000Z"
//         },
//         "user_profile": {
//             "id": 1,
//             "user_id": 1,
//             "first_name": "Uchechukwu",
//             "middle_name": "Victor",
//             "last_name": "Eze",
//             "date_of_birth": "2025-01-02",
//             "occupation": "Software Developer",
//             "income_level": "0-100000",
//             "referral_code": "BDH18283829",
//             "gender": "male",
//             "referred_by": 1,
//             "user_tag": "echovick",
//             "created_at": "2025-01-24T01:00:24.000000Z",
//             "updated_at": "2025-01-24T01:00:24.000000Z"
//         }
//     }
