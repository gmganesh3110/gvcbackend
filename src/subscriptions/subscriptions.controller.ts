import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/subscription.dto';
import { Response, Request } from 'express';
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
    @Req() req: Request & { rawBody: string },
    @Headers('x-webhook-signature') signature: string,
    @Headers('x-webhook-timestamp') timestamp: string,
    @Res() res: Response,
  ) {
    try {
      const { rawBody } = req;
      console.log('Raw Body:', rawBody);
      console.log('Parsed Body:', req.body);

      const computedSig = crypto
        .createHmac('sha256', process.env.CASH_FREE_SECRET_KEY!)
        .update(timestamp + rawBody)
        .digest('base64');

      console.log('Timestamp:', timestamp);
      console.log('Computed Signature:', computedSig);
      console.log('Received Signature:', signature);

      if (computedSig !== signature) {
        throw new UnauthorizedException('Invalid webhook signature');
      }

      const body = JSON.parse(rawBody);
      console.log('Verified webhook data:', body);

      if (body.type === 'PAYMENT_SUCCESS_WEBHOOK') {
        await this.subscriptionsService.activateSubscription(
          body.data.order.order_id,
          body.data.payment.cf_payment_id,
          body.data.order.order_amount,
        );
      }

      return res.status(200).send('OK');
    } catch (err: any) {
      console.error('Cashfree Webhook Error:', err);
      return res
        .status(err instanceof UnauthorizedException ? err.getStatus() : 500)
        .send(err.message || 'Webhook processing error');
    }
  }
}
