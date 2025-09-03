import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Table } from 'src/tables/entities/table.entity';
import { Order } from 'src/orders/entities/order.entity';
@Entity()
export class Block {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  blockName: string;
  @Column()
  description: string;
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

  @OneToMany(() => Table, (table) => table.block)
  tables: Table[];

  @OneToMany(() => Order, (order) => order.block)
  orders: Order[];
}