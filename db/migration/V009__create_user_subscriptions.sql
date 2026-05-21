CREATE TYPE subscription_plan AS ENUM ('free', 'oracle', 'cosmic');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due');

CREATE TABLE user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL,
  stripe_subscription_id varchar(255) NOT NULL,
  stripe_customer_id varchar(255) NOT NULL,
  status subscription_status NOT NULL,
  current_period_start timestamp NOT NULL,
  current_period_end timestamp NOT NULL
);
