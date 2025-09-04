// src/subscriptions/subscriptions.service.ts
import { Injectable, Req, Res } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/subscription.dto';
import { EntityManager } from 'typeorm';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly entityManager: EntityManager) {}

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const { createdBy, planType, amount, firstName, email, phone, restuarent } =
      createSubscriptionDto;
    const orderId = uuidv4();

    let expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() + (planType === 'monthly' ? 30 : 365),
    );
    await this.entityManager.query(
      `CALL subscriptioncreate(?, ?, ?, ?, ?, ?)`,
      [createdBy, planType, amount, orderId, restuarent, expiresAt],
    );
    const body = {
      order_id: orderId,
      order_amount: amount,
      order_currency: 'INR',
      customer_details: {
        customer_id: createdBy.toString(),
        customer_name: firstName,
        customer_email: email,
        customer_phone: phone?.toString() || '0000000000',
      },
      order_meta: {
        return_url: process.env.CASH_FREE_RETURN_URL,
        notify_url: process.env.CASH_FREE_NOTIFY_URL,
      },
      order_expiry: Math.floor((expiresAt.getTime() - Date.now()) / 1000),
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-client-id': process.env.CASH_FREE_CLIENT_ID,
      'x-client-secret': process.env.CASH_FREE_SECRET_KEY,
      'x-api-version': '2022-01-01',
    };
    const res = await axios.post(process.env.CASH_FREE_REQUEST_URL!, body, {
      headers,
    });

    const { order_token } = res.data;

    return { data: res.data, orderToken: order_token, amount, planType };
  }

  async activateSubscription(
    orderid: string,
    paymentId: string,
    amount: string,
  ): Promise<any> {
    try {
      const query = `call subscriptionactivate(?,?,?)`;
      const params = [orderid, paymentId, amount];
      return await this.entityManager.query(query, params);
    } catch (err) {
      console.log(err);
    }
  }
}
