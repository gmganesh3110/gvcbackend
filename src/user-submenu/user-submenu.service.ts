import { Injectable } from '@nestjs/common';
import { CreateUserSubmenuDto } from './dto/create-user-submenu.dto';
import { UpdateUserSubmenuDto } from './dto/update-user-submenu.dto';

@Injectable()
export class UserSubmenuService {
  create(createUserSubmenuDto: CreateUserSubmenuDto) {
    return 'This action adds a new userSubmenu';
  }

  findAll() {
    return `This action returns all userSubmenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSubmenu`;
  }

  update(id: number, updateUserSubmenuDto: UpdateUserSubmenuDto) {
    return `This action updates a #${id} userSubmenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSubmenu`;
  }
}
