import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product } from '../../data/domain/product.entity';
import { ProductRepository } from '../../data/repository/product.repository';
import { CreateProductDto } from '../domain/dto/product/createProduct.dto';
import { assign } from 'lodash';

@Injectable()
export class ProductService {
	private readonly logger = new Logger(ProductService.name, {
		timestamp: true,
	});

	constructor(private readonly productRepository: ProductRepository) {}

	async getMany(): Promise<Product[]> {
		return this.productRepository.getMany();
	}

	async getOne(id: string): Promise<Product> {
		const product = this.productRepository.getOne(id);
		if (!product) {
			throw new NotFoundException(`Could not find Product with id ${id}`);
		}
		return product;
	}

	async create(dto: CreateProductDto): Promise<Product> {
		const product = new Product(dto.name, dto.sellIn, dto.quality);
		return await this.productRepository.save(product);
	}
}
