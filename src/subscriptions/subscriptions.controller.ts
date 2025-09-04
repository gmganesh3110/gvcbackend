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
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/subscription.dto';
import { Response } from 'express';
import * as crypto from 'crypto'

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
    @Body() body: any,
    @Headers('x-webhook-signature') signature: string,
    @Res() res: Response,
  ) {
    try {
      const payload = JSON.stringify(body);
      const expectedSignature = crypto
        .createHmac('sha256', process.env.CASH_FREE_SECRET_KEY!)
        .update(payload)
        .digest('base64');

      if (signature !== expectedSignature) {
        return res.status(400).send('Invalid signature');
      }

      // ✅ Process event
      if (body.data?.order_status === 'PAID') {
        await this.subscriptionsService.activateSubscription(
          body.data.order_id,
          body.data.payment_id,
          body.data.order_amount,
        );
      }

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Cashfree Webhook Error:', err);
      return res.status(500).send('Error');
    }
  }
}
