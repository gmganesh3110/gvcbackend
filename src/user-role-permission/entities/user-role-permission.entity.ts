import { Restuarent } from 'src/restuarent/entities/restuarent.entity';
import { UserMenu } from 'src/user-menu/entities/user-menu.entity';
import { UserRole } from 'src/user-role/entities/user-role.entity';
import { UserSubmenu } from 'src/user-submenu/entities/user-submenu.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class UserRolePermission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserRole, { nullable: true })
  @JoinColumn({ name: 'userRoleId' })
  userRoleId: UserRole;
  @ManyToOne(() => UserMenu, { nullable: true })
  @JoinColumn({ name: 'menuId' })
  menuId: UserMenu;
  @Column()
  @ManyToOne(() => UserSubmenu, { nullable: true })
  @JoinColumn({ name: 'subMenuId' })
  subMenuId: UserSubmenu;
  @Column({default: 0})
  pageActionId: number;
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

  @ManyToOne(() => Restuarent, { nullable: true })
  @JoinColumn({ name: 'restuarent' })
  restuarent: Restuarent;
}
