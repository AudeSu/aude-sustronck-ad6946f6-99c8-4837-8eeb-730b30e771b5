import { ProductDto } from '../../../api/domain/dto/product/product.dto';
import { QualityUpdateStrategy } from '../quality-update-strategy.interface';
import { BaseQualityStrategy } from './base-quality.strategy';

export class WineStrategy
	extends BaseQualityStrategy
	implements QualityUpdateStrategy
{
	private static readonly APPRECIATION_RATE = 1;

	updateQuality(product: ProductDto): void {
		this.increaseQuality(product, WineStrategy.APPRECIATION_RATE);
	}

	handleExpired(product: ProductDto): void {
		this.increaseQuality(product, WineStrategy.APPRECIATION_RATE);
	}
}
