CREATE TABLE compatibility_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  sign_a varchar(32) NOT NULL,
  sign_b varchar(32) NOT NULL,
  overall_score int NOT NULL,
  love_score int NOT NULL,
  communication_score int NOT NULL,
  trust_score int NOT NULL,
  passion_score int NOT NULL,
  report_text text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);
