export class Product {
	id: string;
	name: string;
	sellIn: number;
	quality: number;

	constructor(name: string, sellIn: number, quality: number) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}
