import { ProductDto } from '../../api/domain/dto/product/product.dto';

export interface QualityUpdateStrategy {
	updateQuality(product: ProductDto): void;
	handleExpired(product: ProductDto): void;
}
