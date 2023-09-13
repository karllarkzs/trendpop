import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logoImage from '../assets/images/TP_logo_tag.png';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  background: '#F7F9FC',
  boxShadow: 'none', 
  borderBottom: '1px solid transparent',
});

function Header() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <img src={logoImage} alt="Logo" style={{ marginRight: '16px' }} />
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;
