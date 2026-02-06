import { Module } from '@nestjs/common';
import { InventoryService } from './service/inventory.service';
import { DataModule } from '../data/data.module';

@Module({
	imports: [DataModule],
	controllers: [],
	providers: [InventoryService],
	exports: [InventoryService],
})
export class InventoryModule {}
