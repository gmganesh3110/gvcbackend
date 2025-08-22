import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseorderitemDto } from './create-purchaseorderitem.dto';

export class UpdatePurchaseorderitemDto extends PartialType(CreatePurchaseorderitemDto) {}
