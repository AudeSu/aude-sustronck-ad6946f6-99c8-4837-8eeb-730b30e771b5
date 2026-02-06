import { ArgumentMetadata, Logger, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { isEmpty } from 'lodash';
import { ValidationException } from '../domain/validationException';

export class BodyValidationPipe implements PipeTransform<any> {
	private readonly logger = new Logger(BodyValidationPipe.name, {
		timestamp: true,
	});
	constructor(private readonly clazz: any) {}

	async transform(dto: any, metadata: ArgumentMetadata) {
		if (metadata.type === 'body') {
			const converted = plainToInstance(this.clazz, dto, {
				excludeExtraneousValues: true,
			});
			// @ts-ignore
			const errors: ValidationError[] = validateSync(converted as any);

			if (!isEmpty(errors)) {
				throw new ValidationException(errors);
			}
		}
		return dto;
	}
}
