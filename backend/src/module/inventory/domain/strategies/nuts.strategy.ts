import { ProductDto } from '../../../api/domain/dto/product/product.dto';
import { QualityUpdateStrategy } from '../quality-update-strategy.interface';

export class NutsStrategy implements QualityUpdateStrategy {
	private static readonly FIXED_QUALITY = 80;

	updateQuality(product: ProductDto): void {
		product.quality = NutsStrategy.FIXED_QUALITY;
	}

	handleExpired(product: ProductDto): void {
		product.quality = NutsStrategy.FIXED_QUALITY;
	}
}
