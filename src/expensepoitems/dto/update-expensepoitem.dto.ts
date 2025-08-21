import { PartialType } from '@nestjs/mapped-types';
import { CreateExpensepoitemDto } from './create-expensepoitem.dto';

export class UpdateExpensepoitemDto extends PartialType(CreateExpensepoitemDto) {}
