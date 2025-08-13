import { Test, TestingModule } from '@nestjs/testing';
import { PageActionsService } from './page-actions.service';

describe('PageActionsService', () => {
  let service: PageActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageActionsService],
    }).compile();

    service = module.get<PageActionsService>(PageActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
