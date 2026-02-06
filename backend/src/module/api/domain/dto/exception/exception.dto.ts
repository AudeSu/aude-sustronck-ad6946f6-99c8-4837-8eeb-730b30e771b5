import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
	@IsOptional()
	@IsString()
	@Expose()
	@ApiProperty({ type: String, required: false })
	type?: string;

	@IsOptional()
	@IsString()
	@Expose()
	@ApiProperty({ type: String, required: false })
	title?: string;

	@IsOptional()
	@IsNumber()
	@Expose()
	@ApiProperty({ type: Number, required: false })
	status?: number;

	@IsOptional()
	@IsString()
	@Expose()
	@ApiProperty({ type: String, format: 'uuid', required: false })
	identifier?: string;

	@IsOptional()
	@IsNumber()
	@Expose()
	@ApiProperty({ type: Number, required: false })
	code?: number;
}
