import { Module } from '@nestjs/common';
import { PoinventoryService } from './poinventory.service';
import { PoinventoryController } from './poinventory.controller';

@Module({
  controllers: [PoinventoryController],
  providers: [PoinventoryService],
})
export class PoinventoryModule {}
