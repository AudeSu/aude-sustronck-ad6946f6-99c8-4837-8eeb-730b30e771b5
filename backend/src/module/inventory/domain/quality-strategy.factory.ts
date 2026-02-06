import { Injectable } from '@nestjs/common';
import { ProductType, ProductTypeHelper } from './product-type.enum';
import { QualityUpdateStrategy } from './quality-update-strategy.interface';
import { NormalProductStrategy } from './strategies/normal-product.strategy';
import { WineStrategy } from './strategies/wine.strategy';
import { BrieStrategy } from './strategies/brie.strategy';
import { GrapesStrategy } from './strategies/grapes.strategy';
import { NutsStrategy } from './strategies/nuts.strategy';

@Injectable()
export class QualityStrategyFactory {
	private readonly strategies: Map<ProductType, QualityUpdateStrategy>;

	constructor() {
		this.strategies = new Map([
			[ProductType.NORMAL, new NormalProductStrategy()],
			[ProductType.WINE, new WineStrategy()],
			[ProductType.BRIE, new BrieStrategy()],
			[ProductType.GRAPES, new GrapesStrategy()],
			[ProductType.NUTS, new NutsStrategy()],
		]);
	}

	getStrategy(productName: string): QualityUpdateStrategy {
		const productType = ProductTypeHelper.fromName(productName);
		const strategy = this.strategies.get(productType);

		if (!strategy) {
			throw new Error(`No strategy found for product: ${productName}`);
		}

		return strategy;
	}
}
