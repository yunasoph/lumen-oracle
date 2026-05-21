CREATE TYPE journal_mood AS ENUM ('radiant', 'reflective', 'turbulent', 'grounded', 'expansive');

CREATE TABLE user_journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  mood journal_mood NOT NULL,
  moon_phase_id int REFERENCES moon_phases(id) ON DELETE SET NULL,
  tags text[],
  created_at timestamp NOT NULL DEFAULT now()
);
