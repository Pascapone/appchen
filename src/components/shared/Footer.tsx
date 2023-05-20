import React from 'react';
import { Box,Typography } from '@mui/material';
import { styled } from '@mui/system';


const StyledFooter = styled(Box)(({ theme }) => ({
  alignSelf: 'stretch',
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper, // Optional: Add a background color to the footer
}));


export default function Footer() {
  return (
    <StyledFooter>
      <Typography variant="body2" color="textSecondary" align="center">
        Appchen - Neural Nexus ©2023
      </Typography>
    </StyledFooter>
  )
}