import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserSubmenuModule } from './user-submenu/user-submenu.module';
import { UserMenuModule } from './user-menu/user-menu.module';
import { UserRolePermissionModule } from './user-role-permission/user-role-permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { PageActionsModule } from './page-actions/page-actions.module';
import { UserSubmenu } from './user-submenu/entities/user-submenu.entity';
import { UserMenu } from './user-menu/entities/user-menu.entity';
import { UserRole } from './user-role/entities/user-role.entity';
import { UserRolePermission } from './user-role-permission/entities/user-role-permission.entity';
import { PageAction } from './page-actions/entities/page-action.entity';
import { BlocksModule } from './blocks/blocks.module';
import { TablesModule } from './tables/tables.module';
import { CategoriesModule } from './categories/categories.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { OrderitemsModule } from './orderitems/orderitems.module';
import { Block } from './blocks/entities/block.entity';
import { Table } from './tables/entities/table.entity';
import { Category } from './categories/entities/category.entity';
import { Items } from './items/entities/item.entity';
import { Order } from './orders/entities/order.entity';
import { Orderitem } from './orderitems/entities/orderitem.entity';
import { ExpenseitemsModule } from './expenseitems/expenseitems.module';
import { ExpenseposModule } from './expensepos/expensepos.module';
import { ExpensepoitemsModule } from './expensepoitems/expensepoitems.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')!, 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [
          User,
          UserSubmenu,
          UserMenu,
          UserRole,
          UserRolePermission,
          PageAction,
          Block,
          Table,
          Category,
          Items,
          Order,
          Orderitem
        ],
      }),
    }),
    AuthModule,
    UsersModule,
    UserRoleModule,
    UserRolePermissionModule,
    UserMenuModule,
    UserSubmenuModule,
    PageActionsModule,
    BlocksModule,
    TablesModule,
    CategoriesModule,
    ItemsModule,
    OrdersModule,
    OrderitemsModule,
    ExpenseitemsModule,
    ExpenseposModule,
    ExpensepoitemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
