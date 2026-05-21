import { prisma } from '../config/prisma';

export const getUserPlan = async (userId: string) => {
  const subscription = await prisma.userSubscription.findFirst({
    where: { user_id: userId, status: 'active' },
    orderBy: { current_period_end: 'desc' },
  });

  return subscription?.plan ?? 'free';
};
