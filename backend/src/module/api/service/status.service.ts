import { Injectable, Logger } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';

@Injectable()
export class StatusService {
	private readonly logger = new Logger(StatusService.name, {
		timestamp: true,
	});

	/**
	 * Returns the health status of the application. There are no external dependencies, so always returns 'ok' for now.
	 */
	async getHealth(): Promise<HealthCheckResult> {
		return {
			status: 'ok',
			details: {},
		};
	}
}
