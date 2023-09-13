const express = require('express');
const bodyParser = require('body-parser');
const { pool, testDatabaseConnection } = require('./db');
const cors = require('cors'); 

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
app.post('/api/po', (req, res) => {
  const { poNumber, workspaceName, subscriptionPlan, billingAmount, billingPeriod } = req.body;

  // Check if PO# is empty
  if (!poNumber) {
    return res.status(400).json({ error: 'PO# is required' });
  }

    // Convert billingAmount to a numeric type
  const numericBillingAmount = parseFloat(billingAmount.replace('$', '').replace(',', ''));

  pool.query(
    'INSERT INTO po_numbers (po_number, workspace_name, subscription_plan, billing_amount, billing_period) VALUES ($1, $2, $3, $4, $5)',
    [poNumber, workspaceName, subscriptionPlan, numericBillingAmount, billingPeriod],
    (err) => {
      if (err) {
        console.error('Error inserting PO number:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'PO number saved successfully' });
      }
    }
  );
});

app.get('/api/po', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM po_numbers');
    const poData = rows.map((row) => ({
      id: row.id,
      workspaceName: row.workspace_name,
      subscriptionPlan: row.subscription_plan,
      billingAmount: row.billing_amount,
      billingPeriod: row.billing_period,
      poNumber: row.po_number,
    }));

    // Set the response content type to JSON and send the formatted JSON string
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(poData, null, 2)); // The `2` is for pretty-printing with an indent of 2 spaces
  } catch (error) {
    console.error('Error retrieving PO data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express.js server after testing the database connection
testDatabaseConnection((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});

app.get('/', (req, res) => {
  res.send('PLEASE VISIT /api/po endpoint');
});
