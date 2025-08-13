import { Module } from '@nestjs/common';
import { UserSubmenuService } from './user-submenu.service';
import { UserSubmenuController } from './user-submenu.controller';

@Module({
  controllers: [UserSubmenuController],
  providers: [UserSubmenuService],
})
export class UserSubmenuModule {}
