# AI Prompts Documentation

Keep track of your AI prompts and conversations used during the development and solving of this project.
This helps maintain transparency and provides insights into the problem-solving process.

## Best Practices for AI Interaction

1. Be as specific as possible in your questions
2. Provide context about the issue you're working on
3. Share relevant code snippets when asking for help
4. Ask for explanations of suggested solutions
5. Use AI to learn, not just to get answers

## Tracking AI Usage

When using AI assistance, document:
1. The specific problem or issue being addressed
2. The prompt used
3. Key insights from the AI response
4. How the solution was implemented
5. Any learning outcomes

## Used AI Prompts
1. How do I generate an uuid?

2. I get this error in my test files, how can i fix this?
```
Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha` and then add 'jest' or 'mocha' to the types field in your tsconfig.ts(2593)
```
An this is my tsconfig.json file:
```
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "*": ["*"]
    },
    "incremental": true,
    "esModuleInterop": true,
    "allowJs": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "exclude": ["node_modules", "dist"]
}
```

3. Kun je mijn inventory.service.spec.ts file uitbreiden met nog extra tests? Dit zijn mijn testen die ik al reeds heb en ik zal je ook de inventory.service.ts meegeven. Ik zou graag nog uitgebreide testen hebben voor de andere producten.
```
import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from '../src/module/inventory/service/inventory.service';
import { ProductRepository } from '../src/module/data/repository/product.repository';
import { ProductDto } from '../src/module/api/domain/dto/product/product.dto';

describe('InventoryService', () => {
	let service: InventoryService;
	let repository: ProductRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				InventoryService,
				{
					provide: ProductRepository,
					useValue: {
						getMany: jest.fn(),
						save: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<InventoryService>(InventoryService);
		repository = module.get<ProductRepository>(ProductRepository);
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
});
```

4. What is the best structural solution for this problem? I have a basic gilded rose problem. It's a cheese and wine store with specific logic per product. What is de best refactoring structure that I should use?

