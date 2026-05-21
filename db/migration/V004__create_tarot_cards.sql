CREATE TYPE tarot_arcana AS ENUM ('major', 'minor');

CREATE TABLE tarot_cards (
  id int PRIMARY KEY,
  name varchar(255) NOT NULL,
  arcana tarot_arcana NOT NULL,
  suit varchar(50),
  number int NOT NULL,
  upright_meaning text NOT NULL,
  reversed_meaning text NOT NULL,
  image_url text NOT NULL,
  keywords text[] NOT NULL,
  element varchar(50) NOT NULL,
  astro_connection varchar(50) NOT NULL
);
