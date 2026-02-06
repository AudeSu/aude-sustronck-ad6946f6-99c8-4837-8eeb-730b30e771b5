export class EnvModel {
	// Database
	POSTGRES_HOST: string;
	POSTGRES_PORT: number;
	POSTGRES_USERNAME: string;
	POSTGRES_PASSWORD: string;
	POSTGRES_DATABASE: string;
	POSTGRES_SYNCHRONIZE: boolean;
	POSTGRES_DROP_SCHEMA: boolean;
	POSTGRES_LOGGING: boolean;
	POSTGRES_SSL: boolean;
	POSTGRES_SCHEMA: string;
	POSTGRES_MAX_QUERY_EXECUTION_TIME: number;
	POSTGRES_POOL_SIZE: number;
	POSTGRES_USE_SOCKET_PATH: boolean;
	POSTGRES_SOCKET_PATH: string;

	// PG Boss
	PG_BOSS_SCHEMA: string;
	PG_BOSS_POOL_SIZE: string;

	// Azure
	AZURE_AD_AUDIENCE: string;
	AZURE_AD_TENANT_ID: string;

	// AFAS
	AFAS_ENV_TOKEN: string;
	AFAS_ENV_VERSION: string;
	AFAS_ENV_TYPE: string;
	AFAS_ENV: string;

	// SERVER
	PORT: number;
	TZ: string;
}
