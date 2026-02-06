import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MainModule } from '../src/main.module';
import { TestingModule, Test } from '@nestjs/testing';
import { ProductRepository } from '../src/module/data/repository/product.repository';
import { Product } from '../src/module/data/domain/product.entity';

describe('Product (e2e)', () => {
	let app: INestApplication;
	let productRepository: ProductRepository;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [MainModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		productRepository = moduleFixture.get<ProductRepository>(ProductRepository);
		await app.init();
	});

	beforeEach(async () => {
		await productRepository.clear();
		jest.clearAllMocks();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('GET /products', () => {
		it(`Should return a list of Products`, async () => {
			// Add test data to the product repository
			await productRepository.save([
				{
					name: 'Brie',
					sellIn: 10,
					quality: 20,
				},
				{
					name: 'Wine',
					sellIn: 5,
					quality: 30,
				},
			] as Product[]);

			const res = await request(app.getHttpServer()).get(`/products`).send();
			expect(res.status).toEqual(200);
			expect(res.body.length).toEqual(2);
		});
	});

	describe('GET /products/:id', () => {
		it(`Should return a single Product`, async () => {
			// Add test data to the product repository
			const products = await productRepository.save([
				{
					name: 'Brie',
					sellIn: 10,
					quality: 20,
				},
				{
					name: 'Wine',
					sellIn: 5,
					quality: 30,
				},
			] as Product[]);

			const res = await request(app.getHttpServer())
				.get(`/products/${products[0].id}`)
				.send();
			expect(res.status).toEqual(200);
			expect(res.body.id).toEqual(products[0].id);
			expect(res.body.name).toEqual(products[0].name);
			expect(res.body.sellIn).toEqual(products[0].sellIn);
			expect(res.body.quality).toEqual(products[0].quality);
		});
	});

	describe('POST /products', () => {
		it(`Should create a new Product`, async () => {
			const res = await request(app.getHttpServer()).post(`/products`).send({
				name: 'Brie',
				sellIn: 10,
				quality: 20,
			});
			expect(res.status).toEqual(201);
			const productId = res.body.id;
			expect(productId).toBeDefined();
			const product = await productRepository.getOne(productId);
			expect(product).toBeDefined();
			expect(product.name).toEqual('Brie');
			expect(product.sellIn).toEqual(10);
			expect(product.quality).toEqual(20);
		});

		it(`Should not create a new Product without name`, async () => {
			const res = await request(app.getHttpServer()).post(`/products`).send({
				sellIn: 10,
				quality: 20,
			});
			expect(res.status).toEqual(400);
			expect(res.body?.title).toEqual('name must be a string');
		});
	});
});
