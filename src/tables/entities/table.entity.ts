import { Block } from 'src/blocks/entities/block.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Table {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Block, { nullable: true })
  @JoinColumn({ name: 'blockId' })
  blockId: Block;
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
}
