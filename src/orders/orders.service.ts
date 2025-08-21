import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto, GetAllOrdersDto, GetOrderDetailsDto, UpdateOrderDto } from './dto/order.dto';
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
      const query = `call ordercreateone(?,?,?,?,?,?,?,?)`;
      const params = [
        createOrderDto.blockId,
        createOrderDto.tableId,
        createOrderDto.totalAmount,
        createOrderDto.status,
        createOrderDto.type,
        createOrderDto.isPaid,
        createOrderDto.paymentMode,
        createOrderDto.createdBy,
      ];
      const res = await this.entityManager.query(query, params);
      const orderId = res[0][0]?.pid;
      const orderItemsQuery = `call ordercreateitems(?,?,?,?,?)`;
      for (const item of createOrderDto.items) {
        await this.entityManager.query(orderItemsQuery, [
          orderId,
          item.id,
          item.quantity,
          item.price,
          createOrderDto.createdBy,
        ]);
      }

      return { id: orderId };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getOrderDetails(getOrderDetailsDto: GetOrderDetailsDto): Promise<any> {
    try {
      const { orderId } = getOrderDetailsDto;
      const query = `call ordergetdetails(?)`;
      const params = [orderId];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
      const { orderId, isPaid, paymentMode, modifiedBy,status } = updateOrderDto;
      const query = `call orderupdate(?,?,?,?,?)`;
      const params = [orderId, isPaid, paymentMode, modifiedBy,status];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAllOrders(getAllOrdersDto: GetAllOrdersDto): Promise<any> {
    try {
      const { start, limit , orderId,fromDate,toDate, orderType, orderStatus } = getAllOrdersDto;
      const query = `call ordergetall(?,?,?,?,?,?,?)`;
      const params = [start, limit, orderId, fromDate, toDate, orderType, orderStatus];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}