import { ProductDto } from '../../../api/domain/dto/product/product.dto';
import { QualityUpdateStrategy } from '../quality-update-strategy.interface';
import { BaseQualityStrategy } from './base-quality.strategy';

export class GrapesStrategy
	extends BaseQualityStrategy
	implements QualityUpdateStrategy
{
	private static readonly DEGRADATION_RATE = 2;

	updateQuality(product: ProductDto): void {
		this.decreaseQuality(product, GrapesStrategy.DEGRADATION_RATE);
	}

	handleExpired(product: ProductDto): void {
		this.decreaseQuality(product, GrapesStrategy.DEGRADATION_RATE);
	}
}