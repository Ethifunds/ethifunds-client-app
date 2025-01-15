export type EnvironmentVariables = {
	base_url: string;
	server: string;
	socket: string;
	socket_url: string;
};

export type StorageKeys = {
	email: string;
	session: string;
	remember_me: string;
};

export type Environment = "production" | "development";
const NODE_ENV = "development";

const BASE_URL = ``;
const SERVER = "";
const SOCKET = "";
const SOCKET_URL = ``;

const STORAGE: StorageKeys = {
	email: "_et_email",
	session: "_et_session",
	remember_me: "_et_rme",
};

const ACTIVE: EnvironmentVariables = {
	base_url: BASE_URL,
	server: SERVER,
	socket: SOCKET,
	socket_url: SOCKET_URL,
};

const INACTIVE_LIMIT = 5;

export { NODE_ENV, ACTIVE, BASE_URL, SERVER, SOCKET, SOCKET_URL, INACTIVE_LIMIT, STORAGE };
