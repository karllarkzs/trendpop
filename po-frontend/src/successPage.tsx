import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const SuccessContainer = styled('div')({
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '4px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  width: '563px',
  height: '765px',
});

const SuccessPage = () => {
  return (
    <SuccessContainer>
      <div style={{ margin: '40px' }}>
      <Typography variant="h5">Thank you for submitting your PO#!</Typography>
      <p>Go back to <a href="/">Workspace Settings</a></p>
      </div>
    </SuccessContainer>
  );
};

export default SuccessPage;
