import { Module } from '@nestjs/common';
import { StatusController } from './controller/status.controller';
import { StatusService } from './service/status.service';
import { DataModule } from '../data/data.module';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './middleware/httpException.filter';

@Module({
	imports: [DataModule],
	controllers: [StatusController, ProductController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		StatusService,
		ProductService,
	],
	exports: [],
})
export class ApiModule {}
