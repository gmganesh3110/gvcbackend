import { Restuarent } from 'src/restuarent/entities/restuarent.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Restuarent, { nullable: true })
  @JoinColumn({ name: 'restuarent' })
  restuarent: Restuarent;

  @Column({ unique: true })
  orderId: string; 

  @Column()
  planType: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({default:'Pending'})
  paymentStatus?: string; // Pending / Success / Failed

  @Column({default:null})
  paymentId?:string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ default: 1 })
  activeStatus: number;
}
