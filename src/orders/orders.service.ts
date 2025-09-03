import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateOrderDto,
  GetAllOrdersDto,
  GetOrderDetailsDto,
  UpdateOrderDto,
} from './dto/order.dto';
import { Between, EntityManager, Repository } from 'typeorm';
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
        where: { activeStatus: 1, tables: { activeStatus: 1 } },
        relations: ['tables', 'tables.orders'],
      });
      return blocks;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      // Create order entity using IDs

      console.log('createOrderDto', createOrderDto);
      const order = this.ordersRepository.create({
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
        ...(createOrderDto.block
          ? { block: { id: createOrderDto.block } }
          : {}),
        ...(createOrderDto.table
          ? { table: { id: createOrderDto.table } }
          : {}),
      });

      const savedOrder = await this.ordersRepository.save(order);

      // Create order items
      const orderItems = createOrderDto.items.map((item) =>
        this.orderItemsRepository.create({
          order: { id: savedOrder.id },
          item: { id: item.id }, // Item entity with ID
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

      return savedOrder;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getOrderDetails(getOrderDetailsDto: GetOrderDetailsDto): Promise<any> {
    try {
      const { orderId } = getOrderDetailsDto;

      const order = await this.ordersRepository.findOne({
        where: { id: orderId },
        relations: ['createdBy', 'updatedBy', 'orderitems', 'orderitems.item'],
        select: {
          id: true,
          totalAmount: true,
          type: true,
          paymentMode: true,
          isPaid: true,
          status: true,
          orderitems: {
            id: true,
            price: true,
            quantity: true,
            item: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      return order;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
      const { orderId, isPaid, paymentMode, modifiedBy, status } =
        updateOrderDto;

      // find existing order
      const order = await this.ordersRepository.findOne({
        where: { id: orderId },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      // update fields
      order.isPaid = isPaid;
      order.paymentMode = paymentMode;
      order.status = status;
      order.updatedBy = { id: modifiedBy } as any; // relation to User
      order.updatedAt = new Date();

      // save updated entity
      const updatedOrder = await this.ordersRepository.save(order);

      return {
        message: 'Order updated successfully',
        order: updatedOrder,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAllOrders(getAllOrdersDto: GetAllOrdersDto): Promise<any> {
    try {
      const {
        start = 0,
        limit = 10,
        orderId,
        fromDate,
        toDate,
        orderType,
        orderStatus,
      } = getAllOrdersDto;

      const where: any = { activeStatus: 1 };

      if (orderId && orderId > 0) {
        where.id = orderId;
      }

      if (fromDate && toDate) {
        where.date = Between(new Date(fromDate), new Date(toDate));
      }

      if (orderType) {
        where.type = orderType;
      }

      if (orderStatus) {
        where.status = orderStatus;
      }

      const [data, total] = await this.ordersRepository.findAndCount({
        where,
        select: {
          id: true,
          totalAmount: true,
          isPaid: true,
          status: true,
          type: true,
          date: true,
          time: true,
        },
        order: { id: 'DESC' },
        skip: start,
        take: limit,
      });

      return { data, total };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
