import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { Table } from './entities/table.entity';  // ✅ import your entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Table]), // ✅ register entity here
  ],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TablesService], // optional: export if other modules need it
})
export class TablesModule {}
