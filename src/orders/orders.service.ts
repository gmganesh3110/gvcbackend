import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(private readonly entityManager: EntityManager) {}
  async getBlocksAndTablesWithOrders() {
    try {
      const query = `call ordergetfloorsandtableswithorders()`;
      return await this.entityManager.query(query);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    try {
      const query = `call ordercreateone(?,?,?,?,?,?,?)`;
      const params = [
        createOrderDto.blockId,
        createOrderDto.tableId,
        createOrderDto.totalAmount,
        createOrderDto.status,
        createOrderDto.type,
        createOrderDto.paymentMode,
        createOrderDto.createdBy,
      ];
      const res = await this.entityManager.query(query, params);
      const orderId = res[0]?.id;
      const orderItemsQuery = `call ordercreateitems(?,?,?,?,?)`;
      for (const item of createOrderDto.items) {
        await this.entityManager.query(orderItemsQuery, [orderId, item.id, item.quantity, item.price, createOrderDto.createdBy]);
      }
      
      return { id: orderId };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
