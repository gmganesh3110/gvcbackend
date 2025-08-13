import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentmodeDto } from './create-paymentmode.dto';

export class UpdatePaymentmodeDto extends PartialType(CreatePaymentmodeDto) {}
