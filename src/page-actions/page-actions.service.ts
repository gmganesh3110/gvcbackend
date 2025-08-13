import { Injectable } from '@nestjs/common';
import { CreatePageActionDto } from './dto/create-page-action.dto';
import { UpdatePageActionDto } from './dto/update-page-action.dto';

@Injectable()
export class PageActionsService {
  create(createPageActionDto: CreatePageActionDto) {
    return 'This action adds a new pageAction';
  }

  findAll() {
    return `This action returns all pageActions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pageAction`;
  }

  update(id: number, updatePageActionDto: UpdatePageActionDto) {
    return `This action updates a #${id} pageAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} pageAction`;
  }
}
