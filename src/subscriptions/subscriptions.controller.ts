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

  @Post('verify')
  async verifyPayment(@Body() body) {
    console.log(body, 'Request verify');
    const isValid = this.subscriptionsService.verifyPayment(body);
    if (isValid) {
      await this.subscriptionsService.activateSubscription(
        body.orderId,
        body.razorpay_payment_id,
        body.razorpay_amount,
      );
      console.log('Subscription activated');
      return { success: true };
    } else {
      return { success: false };
    }
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request & { rawBody: string },
    @Res() res: Response,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

      // Verify signature
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(req.rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        throw new UnauthorizedException('Invalid webhook signature');
      }

      const event = req.body;
      console.log('Razorpay Webhook:', event);

      if (event.event === 'order.paid' || event.event === 'payment.captured') {
        const payment = event.payload.payment.entity;
        const order = event.payload.order?.entity; // contains receipt

        console.log('Razorpay payment:', payment);
        console.log('Razorpay order:', order);

        // ✅ Use receipt to map back to your DB subscription record
        const dbOrderId = order?.receipt; // your UUID

        await this.subscriptionsService.activateSubscription(
          dbOrderId, // your DB order ID
          payment.id, // razorpay_payment_id
          (payment.amount / 100).toString(),
        );

        console.log('✅ Subscription activated via webhook');
      }

      if (event.event === 'payment.failed') {
        console.log('❌ Payment failed:', event.payload.payment.entity);
        // Optional: update DB to mark subscription as failed
      }

      return res.status(200).send({ status: 'ok' });
    } catch (err) {
      console.error('Webhook error:', err);
      return res.status(400).send({ error: err.message });
    }
  }
}
