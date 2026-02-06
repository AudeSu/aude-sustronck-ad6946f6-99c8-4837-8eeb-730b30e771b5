import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HealthDto {
	@ApiProperty({ required: true })
	@Expose()
	status!: any;
}
