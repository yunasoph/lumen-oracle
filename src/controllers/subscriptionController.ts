import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../config/stripe';
import { env } from '../config/env';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';

const priceMap: Record<string, string | undefined> = {
  oracle: env.STRIPE_PRICE_ORACLE,
  cosmic: env.STRIPE_PRICE_COSMIC,
};

const toSubscriptionStatus = (status: Stripe.Subscription.Status) => {
  if (status === 'active' || status === 'trialing') {
    return 'active';
  }
  if (status === 'past_due' || status === 'unpaid') {
    return 'past_due';
  }
  return 'cancelled';
};

export const createCheckout = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const { plan } = req.body as { plan: string };
  const priceId = priceMap[plan];
  if (!priceId) {
    throw new AppError('Invalid subscription plan', 400);
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: req.user.email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.CLIENT_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.CLIENT_URL}/billing/cancel`,
    metadata: {
      userId: req.user.id,
      plan,
    },
  });

  res.json({ url: session.url });
});

export const handleWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'];
  if (!signature || Array.isArray(signature)) {
    throw new AppError('Invalid signature', 400);
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    throw new AppError('Webhook signature verification failed', 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscriptionId = session.subscription?.toString();
    const customerId = session.customer?.toString();
    const plan = session.metadata?.plan;
    const userId = session.metadata?.userId;

    if (subscriptionId && customerId && plan && userId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await prisma.userSubscription.create({
        data: {
          user_id: userId,
          plan: plan as 'oracle' | 'cosmic',
          stripe_subscription_id: subscriptionId,
          stripe_customer_id: customerId,
          status: toSubscriptionStatus(subscription.status),
          current_period_start: new Date(subscription.current_period_start * 1000),
          current_period_end: new Date(subscription.current_period_end * 1000),
        },
      });
    }
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    await prisma.userSubscription.updateMany({
      where: { stripe_subscription_id: subscription.id },
      data: {
        status: toSubscriptionStatus(subscription.status),
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
      },
    });
  }

  res.json({ received: true });
});

export const getStatus = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const subscription = await prisma.userSubscription.findFirst({
    where: { user_id: req.user.id },
    orderBy: { current_period_end: 'desc' },
  });

  res.json(subscription ?? { plan: 'free', status: 'inactive' });
});

export const cancelSubscription = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const subscription = await prisma.userSubscription.findFirst({
    where: { user_id: req.user.id, status: 'active' },
    orderBy: { current_period_end: 'desc' },
  });

  if (!subscription) {
    throw new AppError('No active subscription found', 404);
  }

  await stripe.subscriptions.cancel(subscription.stripe_subscription_id);
  await prisma.userSubscription.update({
    where: { id: subscription.id },
    data: { status: 'cancelled' },
  });

  res.status(204).send();
});

export const createPortal = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const subscription = await prisma.userSubscription.findFirst({
    where: { user_id: req.user.id },
    orderBy: { current_period_end: 'desc' },
  });

  if (!subscription) {
    throw new AppError('Subscription not found', 404);
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${env.CLIENT_URL}/account/billing`,
  });

  res.json({ url: session.url });
});
