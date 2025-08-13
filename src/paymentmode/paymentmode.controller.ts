import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentmodeService } from './paymentmode.service';
import { CreatePaymentmodeDto } from './dto/create-paymentmode.dto';
import { UpdatePaymentmodeDto } from './dto/update-paymentmode.dto';

@Controller('paymentmode')
export class PaymentmodeController {
  constructor(private readonly paymentmodeService: PaymentmodeService) {}

  @Post()
  create(@Body() createPaymentmodeDto: CreatePaymentmodeDto) {
    return this.paymentmodeService.create(createPaymentmodeDto);
  }

  @Get()
  findAll() {
    return this.paymentmodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentmodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentmodeDto: UpdatePaymentmodeDto) {
    return this.paymentmodeService.update(+id, updatePaymentmodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentmodeService.remove(+id);
  }
}
