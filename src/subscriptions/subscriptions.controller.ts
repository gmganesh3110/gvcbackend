import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Res,
  Req,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/subscription.dto';
import { Response } from 'express';
import * as crypto from 'crypto';

@Controller('subscription')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('create')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return await this.subscriptionsService.createSubscription(
      createSubscriptionDto,
    );
  }

  @Post('webhook')
  async handleCashfreeWebhook(
    @Req() req: Request,
    @Headers('x-webhook-signature') signature: string,
    @Headers('x-webhook-timestamp') timestamp: string,
    @Res() res: Response,
  ) {
    try {
      const body: any = req.body;
      console.log(req.body);
      // ✅ Step 5: Process webhook
      if (body.type === 'PAYMENT_SUCCESS_WEBHOOK') {
        await this.subscriptionsService.activateSubscription(
          body.data.order.order_id,
          body.data.payment.cf_payment_id,
          body.data.order.order_amount,
        );
      }

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Cashfree Webhook Error:', err);
      return res.status(500).send('Error');
    }
  }
}
