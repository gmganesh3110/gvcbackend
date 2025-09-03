import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Block } from 'src/blocks/entities/block.entity';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderitem } from 'src/orderitems/entities/orderitem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Block,Orderitem]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
