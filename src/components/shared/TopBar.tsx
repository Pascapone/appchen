import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Theme, Grid, Avatar, Badge, Button, Box, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserMenu from '@/components/shared/UserMenu/UserMenu';

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

interface TopBarProps {
  onMenuClick: () => void;
}



export default function TopBar({ onMenuClick }: TopBarProps){
  const theme = useTheme();

  return (
    <StyledAppBar position="fixed" theme={theme}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
          <Box sx={{ marginRight: 1 }}>
            <img src="logo-no-background-no-slogan-white.png" alt="logo" style={{ height: '40px' }} />
          </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display:'flex' }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                {/* <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge> */}
              </IconButton>     
              <UserMenu/>                     
            </Box>            
          </Grid>          
        </Grid> 
      </Toolbar>
    </StyledAppBar>
  )  
}