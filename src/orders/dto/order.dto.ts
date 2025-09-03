import { OrderStatus } from 'src/constants/OrderStatus';
import { OrderType } from 'src/constants/OrderTypes';
import { PaymentMode } from 'src/constants/Paymodes';

export class CreateOrderDto {
  block: number;   // Just store the ID
  table: number;   // Just store the ID
  totalAmount: number;
  status: OrderStatus;
  type: OrderType;
  isPaid: boolean;
  paymentMode?: PaymentMode;
  customerNotes?: string;
  staffNotes?: string;
  createdBy: number;
  items: CreateOrderItemsDto[];
}

export class CreateOrderItemsDto {
  id: number; // itemId
  quantity: number;
  price: number;
}

export class GetOrderDetailsDto {
  orderId: number;
}

export class UpdateOrderDto {
  orderId: number;
  isPaid: boolean;
  paymentMode?: PaymentMode;
  modifiedBy: number;
  status: OrderStatus;
}

export class GetAllOrdersDto {
  fromDate?: Date;
  orderType?: OrderType;
  orderStatus?: OrderStatus;
  toDate?: Date;
  orderId?: number;
  start: number;
  limit: number;
}
