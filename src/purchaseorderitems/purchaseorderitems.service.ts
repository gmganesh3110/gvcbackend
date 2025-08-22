import { Injectable } from '@nestjs/common';
import { CreatePurchaseorderitemDto } from './dto/create-purchaseorderitem.dto';
import { UpdatePurchaseorderitemDto } from './dto/update-purchaseorderitem.dto';

@Injectable()
export class PurchaseorderitemsService {
  create(createPurchaseorderitemDto: CreatePurchaseorderitemDto) {
    return 'This action adds a new purchaseorderitem';
  }

  findAll() {
    return `This action returns all purchaseorderitems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseorderitem`;
  }

  update(id: number, updatePurchaseorderitemDto: UpdatePurchaseorderitemDto) {
    return `This action updates a #${id} purchaseorderitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseorderitem`;
  }
}
