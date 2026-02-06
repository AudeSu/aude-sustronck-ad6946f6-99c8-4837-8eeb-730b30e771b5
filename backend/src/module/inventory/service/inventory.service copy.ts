import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../data/repository/product.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductDto } from 'src/module/api/domain/dto/product/product.dto';

@Injectable()
export class InventoryService {
	private static readonly MAX_QUALITY = 50;
	private static readonly MIN_QUALITY = 0;
	private static readonly NUTS_QUALITY = 80;

	private static readonly BRIE_FIRST_THRESHOLD = 11;
	private static readonly BRIE_SECOND_THRESHOLD = 6;

	private static readonly NORMAL_DEGRADATION = 1;
	private static readonly GRAPES_DEGRADATION = 2;
	private static readonly WINE_APPRECIATION = 1;

	constructor(private readonly productRepository: ProductRepository) {}

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
		if (product.name === 'Nuts') {
			return;
		}

		this.updateProductQuality(product);
		product.sellIn--;
		this.handleExpiredProduct(product);
		this.clampQuality(product);
	}

	private updateProductQuality(product: ProductDto): void {
		switch (product.name) {
			case 'Wine':
				this.increaseQuality(product, InventoryService.WINE_APPRECIATION);
				break;
			case 'Brie':
				this.updateBrieQuality(product);
				break;
			case 'Grapes':
				this.decreaseQuality(product, InventoryService.GRAPES_DEGRADATION);
				break;
			default:
				this.decreaseQuality(product, InventoryService.NORMAL_DEGRADATION);
		}
	}

	private handleExpiredProduct(product: ProductDto): void {
		if (product.sellIn >= 0) {
			return;
		}

		switch (product.name) {
			case 'Wine':
				this.increaseQuality(product, InventoryService.WINE_APPRECIATION);
				break;
			case 'Brie':
				product.quality = InventoryService.MIN_QUALITY;
				break;
			case 'Grapes':
				this.decreaseQuality(product, InventoryService.GRAPES_DEGRADATION);
				break;
			default:
				this.decreaseQuality(product, InventoryService.NORMAL_DEGRADATION);
		}
	}

	private updateBrieQuality(product: ProductDto): void {
		let qualityIncrease = 1;

		if (product.sellIn < InventoryService.BRIE_FIRST_THRESHOLD) {
			qualityIncrease = 2;
		}

		if (product.sellIn < InventoryService.BRIE_SECOND_THRESHOLD) {
			qualityIncrease = 3;
		}

		this.increaseQuality(product, qualityIncrease);
	}

	private increaseQuality(product: ProductDto, amount: number): void {
		product.quality = Math.min(
			InventoryService.MAX_QUALITY,
			product.quality + amount,
		);
	}

	private decreaseQuality(product: ProductDto, amount: number): void {
		product.quality = Math.max(
			InventoryService.MIN_QUALITY,
			product.quality - amount,
		);
	}

	private clampQuality(product: ProductDto): void {
		if (product.name === 'Nuts') {
			product.quality = InventoryService.NUTS_QUALITY;
			return;
		}

		product.quality = Math.max(
			InventoryService.MIN_QUALITY,
			Math.min(InventoryService.MAX_QUALITY, product.quality),
		);
	}
}
