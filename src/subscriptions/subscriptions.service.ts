// src/subscriptions/subscriptions.service.ts
import { Injectable, Req, Res } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/subscription.dto';
import { EntityManager } from 'typeorm';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Razorpay = require('razorpay');
import * as crypto from 'crypto';

@Injectable()
export class SubscriptionsService {
  private razorpay: Razorpay;

  constructor(private readonly entityManager: EntityManager) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const { createdBy, planType, amount, restuarent } = createSubscriptionDto;
    const orderId = uuidv4();

    let expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() + (planType === 'monthly' ? 30 : 365),
    );
    await this.entityManager.query(
      `CALL subscriptioncreate(?, ?, ?, ?, ?, ?)`,
      [createdBy, planType, amount, orderId, restuarent, expiresAt],
    );
    const order = await this.razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: orderId,
      notes: {
        planType,
      },
    });
    console.log(orderId,"Order created");
    return { data: order, orderToken: order.id, amount, planType, orderId };
  }

  async activateSubscription(
    orderId: string,
    paymentId: string,
    amount: string,
  ): Promise<any> {
    try {
      const query = `call subscriptionactivate(?,?,?)`;
      const params = [orderId, paymentId, amount];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
    }
  }
  verifyPayment(body: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    const sign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');
    return sign === razorpay_signature;
  }
}
