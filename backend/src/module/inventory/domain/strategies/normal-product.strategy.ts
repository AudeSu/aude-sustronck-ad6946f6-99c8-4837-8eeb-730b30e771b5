import { ProductDto } from '../../../api/domain/dto/product/product.dto';
import { QualityUpdateStrategy } from '../quality-update-strategy.interface';
import { BaseQualityStrategy } from './base-quality.strategy';

export class NormalProductStrategy
	extends BaseQualityStrategy
	implements QualityUpdateStrategy
{
	private static readonly DEGRADATION_RATE = 1;

	updateQuality(product: ProductDto): void {
		this.decreaseQuality(product, NormalProductStrategy.DEGRADATION_RATE);
	}

	handleExpired(product: ProductDto): void {
		this.decreaseQuality(product, NormalProductStrategy.DEGRADATION_RATE);
	}
}
