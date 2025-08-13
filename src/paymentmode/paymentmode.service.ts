import { Injectable } from '@nestjs/common';
import { CreatePaymentmodeDto } from './dto/create-paymentmode.dto';
import { UpdatePaymentmodeDto } from './dto/update-paymentmode.dto';

@Injectable()
export class PaymentmodeService {
  create(createPaymentmodeDto: CreatePaymentmodeDto) {
    return 'This action adds a new paymentmode';
  }

  findAll() {
    return `This action returns all paymentmode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentmode`;
  }

  update(id: number, updatePaymentmodeDto: UpdatePaymentmodeDto) {
    return `This action updates a #${id} paymentmode`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentmode`;
  }
}
