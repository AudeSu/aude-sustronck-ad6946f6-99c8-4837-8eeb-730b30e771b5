import { ProductDto } from '../../../api/domain/dto/product/product.dto';

export abstract class BaseQualityStrategy {
	protected static readonly MAX_QUALITY = 50;
	protected static readonly MIN_QUALITY = 0;

	protected increaseQuality(product: ProductDto, amount: number): void {
		product.quality = Math.min(
			BaseQualityStrategy.MAX_QUALITY,
			product.quality + amount,
		);
	}

	protected decreaseQuality(product: ProductDto, amount: number): void {
		product.quality = Math.max(
			BaseQualityStrategy.MIN_QUALITY,
			product.quality - amount,
		);
	}

	protected clampQuality(product: ProductDto): void {
		product.quality = Math.max(
			BaseQualityStrategy.MIN_QUALITY,
			Math.min(BaseQualityStrategy.MAX_QUALITY, product.quality),
		);
	}
}
