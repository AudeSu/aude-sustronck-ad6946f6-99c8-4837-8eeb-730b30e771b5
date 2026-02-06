import './';
import { ConfigModule } from '@nestjs/config';
import { DynamicModule } from '@nestjs/common';
import * as process from 'process';

export class EnvModule {
	public static forRoot(): DynamicModule {
		return {
			module: EnvModule,
			imports: [
				ConfigModule.forRoot({
					envFilePath: ['.env'],
					isGlobal: true,
				}),
			],
		};
	}
}
