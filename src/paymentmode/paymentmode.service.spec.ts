import { Test, TestingModule } from '@nestjs/testing';
import { PaymentmodeService } from './paymentmode.service';

describe('PaymentmodeService', () => {
  let service: PaymentmodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentmodeService],
    }).compile();

    service = module.get<PaymentmodeService>(PaymentmodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
