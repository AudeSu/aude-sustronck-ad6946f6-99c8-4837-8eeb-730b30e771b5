import {
	Body,
	Controller,
	Get,
	Logger,
	Param,
	Post,
	UsePipes,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ExceptionDto } from '../domain/dto/exception/exception.dto';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from '../domain/dto/product/product.dto';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../domain/dto/product/createProduct.dto';
import { BodyValidationPipe } from '../middleware/bodyValidation.pipe';

@Controller('products')
@ApiTags('Product')
export class ProductController {
	private readonly logger = new Logger(ProductController.name, {
		timestamp: true,
	});

	constructor(private readonly productService: ProductService) {}

	@ApiResponse({
		status: 200,
		type: [ProductDto],
	})
	@ApiBadRequestResponse({
		type: ExceptionDto,
	})
	@ApiInternalServerErrorResponse({
		type: ExceptionDto,
	})
	@Get()
	async getMany(): Promise<ProductDto[]> {
		const products = await this.productService.getMany();
		return plainToInstance(ProductDto, products, {
			excludeExtraneousValues: true,
		});
	}

	@ApiResponse({
		status: 200,
		type: ProductDto,
	})
	@ApiBadRequestResponse({
		type: ExceptionDto,
	})
	@ApiInternalServerErrorResponse({
		type: ExceptionDto,
	})
	@ApiParam({ name: 'id', type: String })
	@Get(':id')
	async getOne(@Param() params): Promise<ProductDto> {
		const products = await this.productService.getOne(params.id);
		return plainToInstance(ProductDto, products, {
			excludeExtraneousValues: true,
		});
	}

	@ApiResponse({
		status: 200,
		type: ProductDto,
	})
	@ApiBadRequestResponse({
		type: ExceptionDto,
	})
	@ApiInternalServerErrorResponse({
		type: ExceptionDto,
	})
	@UsePipes(new BodyValidationPipe(CreateProductDto))
	@Post()
	async create(@Body() dto: CreateProductDto): Promise<ProductDto> {
		const product = await this.productService.create(dto);
		return plainToInstance(ProductDto, product, {
			excludeExtraneousValues: true,
		});
	}
}
