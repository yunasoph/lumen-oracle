CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) NOT NULL UNIQUE,
  username varchar(255) UNIQUE,
  password_hash text,
  full_name varchar(255),
  birth_date date,
  birth_time time,
  birth_city varchar(255),
  birth_country varchar(255),
  birth_latitude decimal(9, 6),
  birth_longitude decimal(9, 6),
  sun_sign varchar(32) NOT NULL,
  moon_sign varchar(32),
  rising_sign varchar(32),
  avatar_url text,
  is_premium boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_sun_sign ON users (sun_sign);
CREATE INDEX idx_users_email ON users (email);
