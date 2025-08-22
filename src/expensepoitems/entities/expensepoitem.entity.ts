import { Expenseitem } from 'src/expenseitems/entities/expenseitem.entity';
import { Expensepo } from 'src/expensepos/entities/expensepo.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Expensepoitem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Expensepo, { nullable: true })
  @JoinColumn({ name: 'expensePoId' })
  expensePoId: Expensepo;
  @ManyToOne(() => Expenseitem, { nullable: true })
  @JoinColumn({ name: 'itemId' })
  itemId: Expenseitem;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  amount: number;

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
