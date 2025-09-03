import { Block } from 'src/blocks/entities/block.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Table {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Block, { nullable: true })
  @JoinColumn({ name: 'block' })
  block: Block;
  @Column({ unique: true })
  tableName: string;
  @Column()
  description: string;
  @Column()
  capacity: number;
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

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
}
