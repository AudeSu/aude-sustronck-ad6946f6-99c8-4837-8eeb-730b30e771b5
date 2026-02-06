import { Module } from '@nestjs/common';
import { InventoryService } from './service/inventory.service';
import { DataModule } from '../data/data.module';
import { QualityStrategyFactory } from './domain/quality-strategy.factory';

@Module({
	imports: [DataModule],
	controllers: [],
	providers: [InventoryService, QualityStrategyFactory],
	exports: [InventoryService],
})
export class InventoryModule {}
