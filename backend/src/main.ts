import './configuration';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MainModule } from './main.module';
import loggerConfig from './configuration/loggerConfig';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Server } from 'http';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
	// Start app
	const app = await NestFactory.create<NestExpressApplication>(MainModule, {
		logger: loggerConfig,
		bodyParser: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useBodyParser('json', { limit: '50mb' });
	app.use(compression());
	app.enableCors();

	const options = new DocumentBuilder()
		.setTitle('Cheese & Wine store')
		.setDescription('API documentation of the Cheese & Wine store')
		.setVersion('1.0')
		.build();

	const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('docs', app, document);

	const httpAdapter = app.getHttpAdapter();
	const server: Server = httpAdapter.getHttpServer();
	server.keepAliveTimeout = 60000;

	await app.listen(process.env.PORT || 3333);
}

(async () => {
	await bootstrap();
})();
