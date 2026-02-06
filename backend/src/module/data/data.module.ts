import { Module } from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';

@Module({
	imports: [],
	controllers: [],
	providers: [ProductRepository],
	exports: [ProductRepository],
})
export class DataModule {}
