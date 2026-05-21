CREATE TYPE tarot_spread_type AS ENUM ('single', 'three_card', 'celtic_cross');

CREATE TABLE tarot_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  spread_type tarot_spread_type NOT NULL,
  question text,
  cards_drawn jsonb NOT NULL,
  interpretation text NOT NULL,
  session_token varchar(255),
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX idx_tarot_readings_user_id ON tarot_readings (user_id);
