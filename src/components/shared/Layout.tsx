import React from 'react';
import { useState } from 'react';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import TopBar from '@/components/shared/TopBar';
import SideBar from '@/components/shared/SideBar';
import Footer from '@/components/shared/Footer';


const drawerWidth = 240;

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const MainContent = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  padding: 10
});

export default function Layout({ children }: {children: React.ReactNode}) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      <CssBaseline />
      <TopBar onMenuClick={handleDrawerToggle} />
      <SideBar open={drawerOpen} onClose={handleDrawerToggle}/>
      <Content>
        <Toolbar />
        <MainContent>{children}</MainContent>  
        <Footer/>      
      </Content>
    </Box>
  );
};