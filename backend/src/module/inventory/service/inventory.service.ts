import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../data/repository/product.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class InventoryService {
	constructor(private readonly productRepository: ProductRepository) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async updateQuality(): Promise<void> {
		const products = await this.productRepository.getMany();
		for (let i = 0; i < products.length; i++) {
			if (products[i].name != 'Wine' && products[i].name != 'Brie') {
				if (products[i].quality > 0) {
					if (products[i].name != 'Nuts') {
						products[i].quality = products[i].quality - 1;
					}
				}
			} else {
				if (products[i].quality < 50) {
					products[i].quality = products[i].quality + 1;
					if (products[i].name == 'Brie') {
						if (products[i].sellIn < 11) {
							if (products[i].quality < 50) {
								products[i].quality = products[i].quality + 1;
							}
						}
						if (products[i].sellIn < 6) {
							if (products[i].quality < 50) {
								products[i].quality = products[i].quality + 1;
							}
						}
					}
				}
			}
			if (products[i].name != 'Nuts') {
				products[i].sellIn = products[i].sellIn - 1;
			}
			if (products[i].sellIn < 0) {
				if (products[i].name != 'Wine') {
					if (products[i].name != 'Brie') {
						if (products[i].quality > 0) {
							if (products[i].name != 'Nuts') {
								products[i].quality = products[i].quality - 1;
							}
						}
					} else {
						products[i].quality = products[i].quality - products[i].quality;
					}
				} else {
					if (products[i].quality < 50) {
						products[i].quality = products[i].quality + 1;
					}
				}
			}
		}

		await this.productRepository.save(products);
	}
}
