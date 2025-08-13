import { PartialType } from '@nestjs/mapped-types';
import { CreatePageActionDto } from './create-page-action.dto';

export class UpdatePageActionDto extends PartialType(CreatePageActionDto) {}
