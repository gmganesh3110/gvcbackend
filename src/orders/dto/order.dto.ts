import { OrderStatus } from 'src/constants/OrderStatus';
import { OrderType } from 'src/constants/OrderTypes';
import { PaymentMode } from 'src/constants/Paymodes';

export class CreateOrderDto {
  blockId: number;
  tableId: number;
  totalAmount: number;
  status: OrderStatus;
  type: OrderType;
  paymentMode?: PaymentMode;
  customerNotes?: string;
  staffNotes?: string;
  createdBy: number;
  items: CreateOrderItemsDto[];
}

export class CreateOrderItemsDto {
  id: number;
  quantity: number;
  price: number;
}
