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
    @Res() res: Response,
  ) {
    try {
      // ✅ Get raw body as string
      const rawBody =
        (req as any).rawBody?.toString() || JSON.stringify(req.body);

      const expectedSignature = crypto
        .createHmac('sha256', process.env.CASH_FREE_SECRET_KEY!)
        .update(rawBody)
        .digest('base64');

      console.log(signature, 'Signature');
      console.log(expectedSignature, 'expectedSignature');

      if (signature !== expectedSignature) {
        return res.status(400).send('Invalid signature');
      }

      const body :any= req.body;

      // ✅ Process event
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
