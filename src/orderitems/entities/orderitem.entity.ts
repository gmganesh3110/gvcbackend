import { Items } from 'src/items/entities/item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orderitem')
export class Orderitem {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'order' })
  order: Order;
  @ManyToOne(() => Items, { nullable: true })
  @JoinColumn({ name: 'item' })
  item: Items;
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