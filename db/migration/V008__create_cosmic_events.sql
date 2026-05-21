CREATE TYPE cosmic_intensity AS ENUM ('gentle', 'moderate', 'powerful', 'transformative');

CREATE TABLE cosmic_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type varchar(100) NOT NULL,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  affected_signs text[] NOT NULL,
  intensity cosmic_intensity NOT NULL,
  icon_name varchar(100) NOT NULL
);

CREATE INDEX idx_cosmic_events_start_date ON cosmic_events (start_date);
