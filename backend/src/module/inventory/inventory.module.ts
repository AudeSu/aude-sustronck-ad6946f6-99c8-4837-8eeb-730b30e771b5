import { Module } from '@nestjs/common';
import { InventoryService } from './service/inventory.service';
import { DataModule } from '../data/data.module';

@Module({
	imports: [DataModule],
	controllers: [],
	providers: [InventoryService],
	exports: [],
})
export class InventoryModule {}
