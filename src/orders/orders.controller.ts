import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post('getblocksandtableswithorders')
  async getBlocksAndTablesWithOrders() {
    return await this.ordersService.getBlocksAndTablesWithOrders();
  }

  @Post('createorder')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.createOrder(createOrderDto);
  }
}
