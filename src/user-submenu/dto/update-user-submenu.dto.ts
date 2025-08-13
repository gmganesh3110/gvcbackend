import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSubmenuDto } from './create-user-submenu.dto';

export class UpdateUserSubmenuDto extends PartialType(CreateUserSubmenuDto) {}
