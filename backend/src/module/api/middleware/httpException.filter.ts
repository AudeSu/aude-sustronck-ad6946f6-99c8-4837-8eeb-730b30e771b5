import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { chain, values } from 'lodash';
import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';
import { ValidationException } from '../domain/validationException';
import { plainToInstance } from 'class-transformer';
import { ExceptionDto } from '../domain/dto/exception/exception.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name, {
		timestamp: true,
	});

	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		let status = exception['status'] || 500;
		let message = exception.message;

		if (exception instanceof ValidationException) {
			status = 400;
			message = chain(exception['validationErrors'])
				.flatMap((error: ValidationError) =>
					this.getValidationErrorMessages(error),
				)
				.value()
				.join(', ');
		}

		if (exception instanceof QueryFailedError) {
			status = 400;
			message = exception.message;
		}

		// Log all error responses
		if (process.env.LOG_HTTP_EXCEPTIONS === 'true') {
			this.logger.error(
				`${request.method} ${request.url} ${status}: ${message} - ${request.ip}`,
				{
					stack: exception.stack,
					name: exception.name,
					query: exception['query'],
					parameters: exception['parameters'],
					message,
					statusCode: status,
					requestBody: request.body,
					requestHeaders: request.headers,
				},
			);
		}

		response
			.status(status)
			.json(plainToInstance(ExceptionDto, { title: message, status }));
	}

	private getValidationErrorMessages = (error: ValidationError): string[] => {
		if (error.children?.length > 0) {
			return chain(error.children)
				.flatMap((error: ValidationError) =>
					this.getValidationErrorMessages(error),
				)
				.value();
		}
		return values(error.constraints);
	};
}
