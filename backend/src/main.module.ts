import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './module/api/api.module';
import { EnvModule } from './configuration/env.module';
import { InventoryModule } from './module/inventory/inventory.module';

@Module({
	imports: [
		// Config
		EnvModule.forRoot(),

		// Scheduling
		ScheduleModule.forRoot(),

		// Event Emitter
		EventEmitterModule.forRoot({
			maxListeners: 50,
		}),

		// Modules
		ApiModule,
		InventoryModule,
	],
})
export class MainModule {}
