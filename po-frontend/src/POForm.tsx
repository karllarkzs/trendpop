import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import SuccessPage from './successPage';

const FormContainer = styled('form')({
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '4px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '563px',
  height: '765px',
});

const FieldBox = styled(Box)({
  padding: '5px',
  margin: '5px',
  '& .MuiTextField-root': {
    minWidth: '400px',
  },
});

const SubmitButton = styled(Button)({
  background: '#000000',
  width: '400px',
  height: '56px',
  marginTop: '25px',
  borderRadius: '4px',
  padding: '15px 22px',
  gap: '8px',
});

function POForm() {
  const [workspaceName, setWorkspaceName] = useState('Collab');
  const [subscriptionPlan, setSubscriptionPlan] = useState('Team');
  const [billingAmount, setBillingAmount] = useState('$1,0000.00');
  const [billingPeriod, setBillingPeriod] = useState('Jan 11, 2023 - Feb 11, 2023');
  const [poNumber, setPoNumber] = useState('');
  const [poNumberError, setPoNumberError] = useState(false); // Add state for the error
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!poNumber) {
      setPoNumberError(true);
      return;
    }

    // Clear the error state if there is a value
    setPoNumberError(false);

    try {
      const response = await fetch('http://localhost:8080/api/po', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          poNumber,
          workspaceName,
          subscriptionPlan,
          billingAmount,
          billingPeriod,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setPoNumber('');
      } else {
        alert('Error saving PO number');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while saving the PO number');
    }
  };


  return (
    <div>
      {isSubmitted ? (
        <SuccessPage />
      ) : (
      <FormContainer>
        <h2>Please provide your PO # for the invoice</h2>
        <FieldBox>
          <TextField
            label="Workspace Name"
            variant="outlined"
            fullWidth
            inputProps={{ style: { width: '100%' } }}
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </FieldBox>
        <FieldBox>
          <TextField
            label="Subscription Plan"
            variant="outlined"
            fullWidth
            inputProps={{ style: { width: '100%' } }}
            value={subscriptionPlan}
            onChange={(e) => setSubscriptionPlan(e.target.value)}
          />
        </FieldBox>
        <FieldBox>
          <TextField
            label="Billing Amount"
            variant="outlined"
            fullWidth
            inputProps={{ style: { width: '100%' } }}
            value={billingAmount}
            onChange={(e) => setBillingAmount(e.target.value)}
          />
        </FieldBox>
        <FieldBox>
          <TextField
            label="Billing Period"
            variant="outlined"
            fullWidth
            inputProps={{ style: { width: '100%' } }}
            value={billingPeriod}
            onChange={(e) => setBillingPeriod(e.target.value)}
          />
        </FieldBox>
        <FieldBox>
          <TextField
            label="PO#"
            variant="outlined"
            fullWidth
            inputProps={{
              style: { width: '100%' },
              type: 'number',
              inputMode: 'numeric', 
              pattern: '[0-9]*',
            }}
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            required
            error={poNumberError}
            helperText={poNumberError ? 'PO# is required' : ''}
          />
        </FieldBox>
        <FieldBox>
          <Typography variant="body2" color="textSecondary" style={{ width: '100%', textAlign: 'center' }}>
            This PO# will be attached to your invoice. Please check <br />your PO# before submitting as this cannot be changed afterwards.
          </Typography>
        </FieldBox>
        <FieldBox>
          <SubmitButton variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </SubmitButton>
        </FieldBox>
      </FormContainer>
        )}
    </div>
  );
}

export default POForm;
