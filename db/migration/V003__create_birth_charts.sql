CREATE TABLE birth_charts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  chart_data jsonb NOT NULL,
  houses jsonb NOT NULL,
  aspects jsonb NOT NULL,
  dominant_element varchar(16) NOT NULL,
  dominant_modality varchar(16) NOT NULL,
  chart_svg_url text,
  generated_at timestamp NOT NULL DEFAULT now()
);
