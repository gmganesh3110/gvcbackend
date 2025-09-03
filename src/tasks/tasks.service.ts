import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectEntityManager() private readonly entityManager: EntityManager,
    ) {}
  private readonly logger = new Logger(TasksService.name);

  // Runs every minute
  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    try {
        const query=`call emailotpdeactivate()`;
        this.entityManager.query(query);
    } catch (error) {
      console.log(error);
    }
  }
}
