import { ProductDto } from '../../../api/domain/dto/product/product.dto';
import { QualityUpdateStrategy } from '../quality-update-strategy.interface';
import { BaseQualityStrategy } from './base-quality.strategy';

export class BrieStrategy
	extends BaseQualityStrategy
	implements QualityUpdateStrategy
{
	private static readonly FIRST_THRESHOLD = 11;
	private static readonly SECOND_THRESHOLD = 6;

	updateQuality(product: ProductDto): void {
		const qualityIncrease = this.calculateQualityIncrease(product.sellIn);
		this.increaseQuality(product, qualityIncrease);
	}

	handleExpired(product: ProductDto): void {
		product.quality = BaseQualityStrategy.MIN_QUALITY;
	}

	private calculateQualityIncrease(sellIn: number): number {
		if (sellIn < BrieStrategy.SECOND_THRESHOLD) {
			return 3;
		}
		if (sellIn < BrieStrategy.FIRST_THRESHOLD) {
			return 2;
		}
		return 1;
	}
}
