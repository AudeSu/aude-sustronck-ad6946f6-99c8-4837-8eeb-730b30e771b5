import { Injectable } from '@nestjs/common';
import { Product } from '../domain/product.entity';
import { cloneDeep, isArray } from 'lodash';

@Injectable()
export class ProductRepository {
	private readonly products: Map<string, Product> = new Map();

	async getMany(): Promise<Product[]> {
		return Array.from(this.products.values()).map((product) =>
			cloneDeep(product),
		);
	}

	async getOne(id: string): Promise<Product> {
		const product = this.products.get(id);
		return product ? cloneDeep(product) : null;
	}

	async save(product: Product): Promise<Product>;
	async save(products: Product[]): Promise<Product[]>;
	async save(input: Product | Product[]): Promise<Product | Product[]> {
		const productArray = isArray(input) ? input : [input];

		for (const product of productArray) {
			if (!product.id) {
				product.id = crypto.randomUUID();
			}

			const cloned = cloneDeep(product);
			this.products.set(product.id, cloned);
		}

		return input;
	}

	async clear(): Promise<void> {
		this.products.clear();
	}
}
