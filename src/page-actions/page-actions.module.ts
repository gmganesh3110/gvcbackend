import { Module } from '@nestjs/common';
import { PageActionsService } from './page-actions.service';
import { PageActionsController } from './page-actions.controller';

@Module({
  controllers: [PageActionsController],
  providers: [PageActionsService],
})
export class PageActionsModule {}
