import React from 'react';
import { Toolbar, Drawer, List, ListItemIcon, ListItemText, ListItemButton, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
}));

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  const isMobile = useMediaQuery(`(max-width: 600px)`);
  return (
    <StyledDrawer variant={isMobile ? 'temporary' : 'permanent'} open={open} onClose={onClose}>
      <Toolbar />
      <List>        
        <ListItemButton LinkComponent={Link} href='/'>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>    
        <ListItemButton LinkComponent={Link} href='/courses'>
          <ListItemIcon>
            <GroupIcon/>
          </ListItemIcon>
          <ListItemText primary="Kurse" />
        </ListItemButton>         
        <ListItemButton LinkComponent={Link} href='/assignments'>
          <ListItemIcon>
            <GroupIcon/>
          </ListItemIcon>
          <ListItemText primary="Aufgaben" />
        </ListItemButton> 
      </List>
    </StyledDrawer>
  )
}

// {{ variant: { xs: 'temporary', sm: 'permanent' }}}