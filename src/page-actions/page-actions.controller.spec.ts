import { Test, TestingModule } from '@nestjs/testing';
import { PageActionsController } from './page-actions.controller';
import { PageActionsService } from './page-actions.service';

describe('PageActionsController', () => {
  let controller: PageActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageActionsController],
      providers: [PageActionsService],
    }).compile();

    controller = module.get<PageActionsController>(PageActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
