"use client"

import React from 'react';
import { Button, Box, ButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material';

const AppToolbar = ({handleAddCourse}: {handleAddCourse: () => void}) => {
  const theme = useTheme();

  return (
    <Box>
      <ButtonGroup>
        <Button variant='contained' onClick={handleAddCourse}>Neue Kursaufgabe</Button>
      </ButtonGroup>
    </Box>
  );
}

export default AppToolbar;