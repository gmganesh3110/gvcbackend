import { PartialType } from '@nestjs/mapped-types';
import { CreateExpensepoDto } from './create-expensepo.dto';

export class UpdateExpensepoDto extends PartialType(CreateExpensepoDto) {}
