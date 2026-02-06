import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../data/repository/product.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductDto } from 'src/module/api/domain/dto/product/product.dto';

@Injectable()
export class InventoryService {
	constructor(private readonly productRepository: ProductRepository) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async updateQuality(): Promise<void> {
		const products = await this.productRepository.getMany();
		this.updateProducts(products);
		await this.productRepository.save(products);
	}

	updateProducts(products: ProductDto[]): void {
		for (const product of products) {
			switch (product.name) {
				case 'Wine':
					this.updateWine(product);
					break;
				case 'Brie':
					this.updateBrie(product);
					break;
				case 'Nuts':
					break;
				case 'Grapes':
					this.updateGrapes(product);
					break;
				default:
					this.updateNormal(product);
			}

			if (product.name !== 'Nuts') product.sellIn--;

			this.handleExpired(product);
			this.clampQuality(product);
		}
	}

	private updateNormal(product: ProductDto) {
		if (product.quality > 0) product.quality--;
	}

	private updateWine(product: ProductDto) {
		if (product.quality < 50) product.quality++;
	}

	private updateBrie(product: ProductDto) {
		if (product.quality < 50) {
			product.quality++;
			if (product.sellIn < 11 && product.quality < 50) product.quality++;
			if (product.sellIn < 6 && product.quality < 50) product.quality++;
		}
	}

	private updateGrapes(product: ProductDto) {
		if (product.quality > 0) product.quality -= 2;
	}

	private handleExpired(product: ProductDto) {
		if (product.sellIn >= 0) return;

		switch (product.name) {
			case 'Wine':
				if (product.quality < 50) product.quality++;
				break;
			case 'Brie':
				product.quality = 0;
				break;
			case 'Nuts':
				break;
			case 'Grapes':
				if (product.quality > 0) product.quality -= 2;
				break;
			default:
				if (product.quality > 0) product.quality--;
		}
	}

	private clampQuality(product: ProductDto) {
		if (product.name !== 'Nuts') {
			if (product.quality < 0) product.quality = 0;
			if (product.quality > 50) product.quality = 50;
		}
	}
}
