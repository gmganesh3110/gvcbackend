import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMenuService } from './user-menu.service';

@Controller('user-menu')
export class UserMenuController {
  constructor(private readonly userMenuService: UserMenuService) {}

}
