CREATE TYPE horoscope_period_type AS ENUM ('daily', 'weekly', 'monthly', 'yearly');

CREATE TABLE horoscopes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zodiac_sign varchar(32) NOT NULL,
  period_type horoscope_period_type NOT NULL,
  period_date date NOT NULL,
  theme varchar(100) NOT NULL,
  content text NOT NULL,
  lucky_number int,
  lucky_color varchar(50),
  energy_rating int,
  compatibility_sign varchar(32),
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX idx_horoscopes_sign_period ON horoscopes (zodiac_sign, period_type, period_date);
