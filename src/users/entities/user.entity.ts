import { Block } from 'src/blocks/entities/block.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Table } from 'src/tables/entities/table.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Items } from 'src/items/entities/item.entity';
import { Restuarent } from 'src/restuarent/entities/restuarent.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  mobileNumber: string;
  @Column()
  userRole: string;
  @Column()
  password?: string;
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

  @Column({ default: false })
  isRegistered: boolean;

  @OneToMany(() => Block, (block) => block.createdBy)
  createdBlocks: Block[];

  @OneToMany(() => Block, (block) => block.updatedBy)
  updatedBlocks: Block[];

  @OneToMany(() => Table, (table) => table.createdBy)
  createdTables: Table[];

  @OneToMany(() => Table, (table) => table.updatedBy)
  updatedTables: Table[];


  @OneToMany(() => Category, (category) => category.createdBy)
  createdCategories: Category[];

  @OneToMany(() => Category, (category) => category.updatedBy)
  updatedCategories: Category[];

  @OneToMany(() => Items, (item) => item.createdBy)
  createItem: Items[];

  @OneToMany(() => Items, (item) => item.createdBy)
  updateItem: Items[];

  

}