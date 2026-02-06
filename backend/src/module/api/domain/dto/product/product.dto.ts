import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductDto {
	@ApiProperty({ type: String, required: true, format: 'uuid' })
	@Expose()
	id: string;

	@ApiProperty({ type: String, required: true })
	@Expose()
	name: string;

	@ApiProperty({ type: Number, required: true })
	@Expose()
	sellIn: number;

	@ApiProperty({ type: Number, required: true })
	@Expose()
	quality: number;
}
