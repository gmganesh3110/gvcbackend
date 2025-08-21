import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  GetAllOrdersDto,
  GetOrderDetailsDto,
  UpdateOrderDto,
} from './dto/order.dto';

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

  @Post('getorderdetails')
  async getOrderDetails(@Body() getOrderDetailsDto: GetOrderDetailsDto) {
    return await this.ordersService.getOrderDetails(getOrderDetailsDto);
  }

  @Post('updateorder')
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return await this.ordersService.updateOrder(updateOrderDto);
  }

  @Post("getallorders")
  async getAllOrders(@Body() getAllOrdersDto: GetAllOrdersDto) {
    return await this.ordersService.getAllOrders(getAllOrdersDto);
  }
}