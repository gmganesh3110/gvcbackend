// order.entity.ts
import { Block } from 'src/blocks/entities/block.entity';
import { OrderStatus } from 'src/constants/OrderStatus';
import { OrderType } from 'src/constants/OrderTypes';
import { PaymentMode } from 'src/constants/Paymodes';
import { User } from 'src/users/entities/user.entity';
import { Table } from 'src/tables/entities/table.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Block, { nullable: true })
  @JoinColumn({ name: 'blockId' })
  blockId: Block;

  @ManyToOne(() => Table, { nullable: true })
  @JoinColumn({ name: 'tableId' })
  tableId: Table;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'totalAmount',
  })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.INPROGRESS,
  })
  status: OrderStatus;

  @Column({
    type: 'enum',
    enum: OrderType,
    default: OrderType.DINEIN,
  })
  type: OrderType;

  @Column({
    type: 'enum',
    enum: PaymentMode,
    default: PaymentMode.CASH,
    nullable: true,
  })
  paymentMode?: PaymentMode;

  @Column({ nullable: true })
  customerNotes?: string;

  @Column({ name: 'staffNotes', nullable: true })
  staffNotes?: string;

  @Column({ name: 'isPaid', default: false })
  isPaid: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;
  @Column()
  createdAt: Date;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;
  @Column()
  updatedAt: Date;
  @Column()
  activeStatus: number;
}
