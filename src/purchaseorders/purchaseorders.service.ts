import { Injectable } from '@nestjs/common';
import { CreatePurchaseorderDto } from './dto/create-purchaseorder.dto';
import { UpdatePurchaseorderDto } from './dto/update-purchaseorder.dto';

@Injectable()
export class PurchaseordersService {
  create(createPurchaseorderDto: CreatePurchaseorderDto) {
    return 'This action adds a new purchaseorder';
  }

  findAll() {
    return `This action returns all purchaseorders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseorder`;
  }

  update(id: number, updatePurchaseorderDto: UpdatePurchaseorderDto) {
    return `This action updates a #${id} purchaseorder`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseorder`;
  }
}
