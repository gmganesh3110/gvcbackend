import { Test, TestingModule } from '@nestjs/testing';
import { PaymentmodeController } from './paymentmode.controller';
import { PaymentmodeService } from './paymentmode.service';

describe('PaymentmodeController', () => {
  let controller: PaymentmodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentmodeController],
      providers: [PaymentmodeService],
    }).compile();

    controller = module.get<PaymentmodeController>(PaymentmodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
