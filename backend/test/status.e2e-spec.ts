import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MainModule } from '../src/main.module';
import { TestingModule, Test } from '@nestjs/testing';
import { StatusService } from '../src/module/api/service/status.service';
import { HealthCheckResult } from '@nestjs/terminus';

describe('Status (e2e)', () => {
	let app: INestApplication;
	let statusService: StatusService;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [MainModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		statusService = moduleFixture.get<StatusService>(StatusService);
		await app.init();
	});

	beforeEach(async () => {
		jest.clearAllMocks();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('GET /status/health', () => {
		it(`Should return status code 200`, async () => {
			const res = await request(app.getHttpServer())
				.get(`/status/health`)
				.send();

			expect(res.status).toEqual(200);
		});

		it(`Should return status code 503`, async () => {
			jest.spyOn(statusService, 'getHealth').mockResolvedValue({
				status: 'error',
				details: {},
			} as HealthCheckResult);

			const res = await request(app.getHttpServer())
				.get(`/status/health`)
				.send();

			expect(res.status).toEqual(503);
		});
	});
});
