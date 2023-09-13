CREATE TABLE po_numbers (
  id SERIAL PRIMARY KEY,
  po_number VARCHAR(255) NOT NULL,
  workspace_name VARCHAR(255),
  subscription_plan VARCHAR(255),
  billing_amount DECIMAL(10, 2),
  billing_period VARCHAR(255)
);