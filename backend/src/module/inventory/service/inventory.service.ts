import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../data/repository/product.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductDto } from 'src/module/api/domain/dto/product/product.dto';
import { QualityStrategyFactory } from '../domain/quality-strategy.factory';
import { ProductType, ProductTypeHelper } from '../domain/product-type.enum';

@Injectable()
export class InventoryService {
	constructor(
		private readonly productRepository: ProductRepository,
		private readonly strategyFactory: QualityStrategyFactory,
	) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async updateQuality(): Promise<void> {
		const products = await this.productRepository.getMany();
		this.updateProducts(products);
		await this.productRepository.save(products);
	}

	updateProducts(products: ProductDto[]): void {
		for (const product of products) {
			this.updateSingleProduct(product);
		}
	}

	private updateSingleProduct(product: ProductDto): void {
		const strategy = this.strategyFactory.getStrategy(product.name);

		if (ProductTypeHelper.fromName(product.name) === ProductType.NUTS) {
			strategy.updateQuality(product);
			return;
		}

		strategy.updateQuality(product);
		product.sellIn--;

		if (product.sellIn < 0) {
			strategy.handleExpired(product);
		}
	}
}
