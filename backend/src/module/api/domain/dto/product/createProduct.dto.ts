import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
	@ApiProperty({ type: String, required: true })
	@IsString()
	@Expose()
	name: string;

	@ApiProperty({ type: Number, required: true })
	@IsPositive()
	@IsInt()
	@Expose()
	sellIn: number;

	@ApiProperty({ type: Number, required: true })
	@IsPositive()
	@IsInt()
	@Expose()
	quality: number;
}
