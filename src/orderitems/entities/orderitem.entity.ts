import { Items } from 'src/items/entities/item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orderitem')
export class Orderitem {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'orderId' })
  orderId: Order;
  @ManyToOne(() => Items, { nullable: true })
  @JoinColumn({ name: 'itemId' })
  itemId: Items;
  @Column()
  quantity: number;
  @Column()
  price: number;
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