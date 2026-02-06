import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../src/module/inventory/service/inventory.service';
import { ProductRepository } from '../src/module/data/repository/product.repository';
import { ProductDto } from '../src/module/api/domain/dto/product/product.dto';
import { QualityStrategyFactory } from '../src/module/inventory/domain/quality-strategy.factory';

describe('InventoryService', () => {
	let service: InventoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [InventoryService, QualityStrategyFactory, ProductRepository],
		}).compile();

		service = module.get<InventoryService>(InventoryService);
	});

	describe('Normal Products', () => {
		it('should decrease quality and sellIn by 1 for normal products', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Normal Cheese', sellIn: 10, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(9);
			expect(products[0].quality).toBe(19);
		});

		it('should decrease quality by 2 when sellIn has passed', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Normal Cheese', sellIn: 0, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(-1);
			expect(products[0].quality).toBe(18);
		});

		it('should never have negative quality', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Normal Cheese', sellIn: 5, quality: 0 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(0);
		});

		it('should handle quality reaching 0 after expiration', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Normal Cheese', sellIn: 0, quality: 1 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(0);
		});
	});

	describe('Wine', () => {
		it('should increase quality by 1 as it ages', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Wine', sellIn: 10, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(9);
			expect(products[0].quality).toBe(21);
		});

		it('should increase quality by 2 when sellIn has passed', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Wine', sellIn: 0, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(-1);
			expect(products[0].quality).toBe(22);
		});

		it('should never have quality above 50', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Wine', sellIn: 10, quality: 50 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(50);
		});

		it('should not exceed 50 quality even after expiration', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Wine', sellIn: 0, quality: 49 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(50);
		});
	});

	describe('Brie', () => {
		it('should increase quality by 1 when sellIn > 10', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 15, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(14);
			expect(products[0].quality).toBe(21);
		});

		it('should increase quality by 2 when 10 >= sellIn > 5', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 10, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(9);
			expect(products[0].quality).toBe(22);
		});

		it('should increase quality by 3 when 5 >= sellIn > 0', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 5, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(4);
			expect(products[0].quality).toBe(23);
		});

		it('should drop quality to 0 when sellIn reaches 0', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 0, quality: 45 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(-1);
			expect(products[0].quality).toBe(0);
		});

		it('should not exceed quality 50', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 5, quality: 49 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(50);
		});

		it('should handle transition from 11 to 10 days correctly', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 11, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(10);
			expect(products[0].quality).toBe(21);
		});

		it('should handle transition from 6 to 5 days correctly', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 6, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(5);
			expect(products[0].quality).toBe(22);
		});
	});

	describe('Nuts', () => {
		it('should never decrease in quality or sellIn', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Nuts', sellIn: 10, quality: 80 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(10);
			expect(products[0].quality).toBe(80);
		});

		it('should maintain quality of 80 even with negative sellIn', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Nuts', sellIn: -10, quality: 80 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(-10);
			expect(products[0].quality).toBe(80);
		});
	});

	describe('Grapes', () => {
		it('should decrease quality by 2 per day', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Grapes', sellIn: 10, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(9);
			expect(products[0].quality).toBe(18);
		});

		it('should decrease quality by 4 when sellIn has passed', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Grapes', sellIn: 0, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(-1);
			expect(products[0].quality).toBe(16);
		});

		it('should never have negative quality', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Grapes', sellIn: 5, quality: 1 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(0);
		});

		it('should handle low quality with expiration correctly', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Grapes', sellIn: 0, quality: 3 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(0);
		});

		it('should handle Grapes quality edge case: quality=2, expired', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Grapes', sellIn: 0, quality: 2 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(0);
		});
	});

	describe('Edge Cases', () => {
		it('should handle multiple products in one update', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Normal Cheese', sellIn: 10, quality: 20 },
				{ id: '2', name: 'Wine', sellIn: 10, quality: 20 },
				{ id: '3', name: 'Brie', sellIn: 5, quality: 20 },
				{ id: '4', name: 'Nuts', sellIn: 10, quality: 80 },
				{ id: '5', name: 'Grapes', sellIn: 10, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(19);
			expect(products[1].quality).toBe(21);
			expect(products[2].quality).toBe(23);
			expect(products[3].quality).toBe(80);
			expect(products[4].quality).toBe(18);
		});

		it('should handle empty product array', () => {
			const products: ProductDto[] = [];

			expect(() => service.updateProducts(products)).not.toThrow();
		});

		it('should handle quality at exactly 50', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Normal Cheese', sellIn: 10, quality: 50 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(49);
		});

		it('should handle sellIn at exactly 0', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Normal Cheese', sellIn: 0, quality: 10 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(-1);
			expect(products[0].quality).toBe(8);
		});
	});

	describe('Regression Tests - Critical Scenarios', () => {
		it('should handle Brie at boundary: sellIn=1, quality near max', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Brie', sellIn: 1, quality: 48 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(0);
			expect(products[0].quality).toBe(50);
		});

		it('should handle normal product with quality=1 and expired', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Cheddar', sellIn: -1, quality: 1 },
			];

			service.updateProducts(products);

			expect(products[0].quality).toBe(0);
		});

		it('should handle Wine transitioning to expired state', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Wine', sellIn: 1, quality: 48 },
			];

			service.updateProducts(products);
			expect(products[0].sellIn).toBe(0);
			expect(products[0].quality).toBe(49);

			service.updateProducts(products);
			expect(products[0].sellIn).toBe(-1);
			expect(products[0].quality).toBe(50);
		});
	});

	describe('Unknown Products', () => {
		it('should treat unknown product names as normal products', () => {
			const products: ProductDto[] = [
				{ id: '1', name: 'Apple', sellIn: 10, quality: 20 },
			];

			service.updateProducts(products);

			expect(products[0].sellIn).toBe(9);
			expect(products[0].quality).toBe(19);
		});
	});
});
