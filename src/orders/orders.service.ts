import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  CreateOrderDto,
  GetAllOrdersDto,
  GetOrderDetailsDto,
  UpdateOrderDto,
} from './dto/order.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from 'src/blocks/entities/block.entity';
import { Order } from './entities/order.entity';
import { Orderitem } from 'src/orderitems/entities/orderitem.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Block)
    private readonly blocksRepository: Repository<Block>,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Orderitem)
    private readonly orderItemsRepository: Repository<Orderitem>,
  ) {}

  async getBlocksAndTablesWithOrders() {
    try {
      const blocks = await this.blocksRepository.find({
        select: {
          id: true,
          blockName: true,
          tables: {
            id: true,
            tableName: true,
            orders: {
              id: true,
              totalAmount: true,
              status: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        where: { activeStatus: 1 , tables: { activeStatus: 1 } },
        relations: ['tables', 'tables.orders'],
      });
      return blocks;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
  try {
    // Create order entity using IDs
    const order = this.ordersRepository.create({
      block: { id: createOrderDto.block },   // Block entity with ID
      table: { id: createOrderDto.table },   // Table entity with ID
      totalAmount: createOrderDto.totalAmount,
      status: createOrderDto.status,
      type: createOrderDto.type,
      isPaid: createOrderDto.isPaid,
      paymentMode: createOrderDto.paymentMode,
      createdBy: { id: createOrderDto.createdBy }, // User with ID
      updatedBy: { id: createOrderDto.createdBy },
      createdAt: new Date(),
      updatedAt: new Date(),
      activeStatus: 1,
    });

    // Save order first
    const savedOrder = await this.ordersRepository.save(order);

    // Create order items
    const orderItems = createOrderDto.items.map((item) =>
      this.orderItemsRepository.create({
        order: { id: savedOrder.id },
        item: { id: item.id },  // Item entity with ID
        quantity: item.quantity,
        price: item.price,
        createdBy: { id: createOrderDto.createdBy },
        updatedBy: { id: createOrderDto.createdBy },
        createdAt: new Date(),
        updatedAt: new Date(),
        activeStatus: 1,
      }),
    );

    await this.orderItemsRepository.save(orderItems);

    return { id: savedOrder.id };
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
      const { orderId, isPaid, paymentMode, modifiedBy, status } =
        updateOrderDto;
      const query = `call orderupdate(?,?,?,?,?)`;
      const params = [orderId, isPaid, paymentMode, modifiedBy, status];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAllOrders(getAllOrdersDto: GetAllOrdersDto): Promise<any> {
    try {
      const {
        start,
        limit,
        orderId,
        fromDate,
        toDate,
        orderType,
        orderStatus,
      } = getAllOrdersDto;
      const query = `call ordergetall(?,?,?,?,?,?,?)`;
      const params = [
        start,
        limit,
        orderId,
        fromDate,
        toDate,
        orderType,
        orderStatus,
      ];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
