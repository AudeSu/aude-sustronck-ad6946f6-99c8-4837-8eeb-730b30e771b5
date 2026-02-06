export enum ProductType {
	WINE = 'Wine',
	BRIE = 'Brie',
	NUTS = 'Nuts',
	GRAPES = 'Grapes',
	NORMAL = 'Normal',
}

export class ProductTypeHelper {
	private static readonly TYPE_MAP = new Map<string, ProductType>([
		['Wine', ProductType.WINE],
		['Brie', ProductType.BRIE],
		['Nuts', ProductType.NUTS],
		['Grapes', ProductType.GRAPES],
	]);

	static fromName(name: string): ProductType {
		return this.TYPE_MAP.get(name) ?? ProductType.NORMAL;
	}

	static isValid(name: string): boolean {
		return this.TYPE_MAP.has(name);
	}

	static getAllProductNames(): string[] {
		return Array.from(this.TYPE_MAP.keys());
	}
}
