import { Controller, Get, Logger, Res } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { HealthDto } from '../domain/dto/status/health.dto';
import { ExceptionDto } from '../domain/dto/exception/exception.dto';
import { plainToInstance } from 'class-transformer';
import { StatusService } from '../service/status.service';

@Controller('status')
@ApiTags('Status')
export class StatusController {
	private readonly logger = new Logger(StatusController.name, {
		timestamp: true,
	});

	constructor(private readonly statusService: StatusService) {}

	@ApiResponse({
		status: 200,
		type: HealthDto,
	})
	@ApiBadRequestResponse({
		type: ExceptionDto,
	})
	@ApiInternalServerErrorResponse({
		type: ExceptionDto,
	})
	@Get('health')
	async getHealth(@Res() res: Response): Promise<void> {
		const health = await this.statusService.getHealth();
		const statusCode = health.status === 'ok' ? 200 : 503;
		res.status(statusCode).send(plainToInstance(HealthDto, { ...health }));
	}
}
