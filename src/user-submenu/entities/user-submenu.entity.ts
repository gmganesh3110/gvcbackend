import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class UserSubmenu {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  menuId: number;
  @Column()
  subMenuName: string;
  @Column()
  path: string;
  @Column()
  icon: string;
  @Column()
  sequence: number;
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