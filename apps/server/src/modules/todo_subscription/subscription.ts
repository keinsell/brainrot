import { Post } from '@nestjs/common';

export interface Subscription {
  id: string
  customerId: string
  billingInterval: "weekly" | "bi-weekly" | "monthly" | "quarterly" | "semi-annually" | "annually"
  billingFrequency: number
  startDate: Date
  endDate?: Date
  status: "active" | "cancelled" | "expired"
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  lineItems: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}


export class SubscriptionController {

  @Post("start-subscription")
  startSubscription() {
    return "Start subscription";
  }

  @Post("stop-subscription")
  stopSubscription() {
    return "Stop subscription";
  }

  @Post("update-subscription")
  updateSubscription() {
    return "Update subscription";
  }

  @Post("get-subscription")
  getSubscription() {
    return "Get subscription";
  }

  @Post("renew-subscription")
  renewSubscription() {
    return "Renew subscription";
  }

}
