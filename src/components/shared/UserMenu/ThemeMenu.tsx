import { useState } from 'react';
import { Typography, IconButton, Divider, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useUserStore, UserTheme } from '@/store/userStore';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';


const ThemeMenu = ({backToBase}: {backToBase: () => void}) => {  
  const [ userDarkTheme, setUserDarkTheme ] = useUserStore(state => [state.userTheme, state.setUserTheme]) 
  const [ setUserDarkMode ] = useUserStore(state => [state.setDarkMode])
  
  const [view, setView] = useState(userDarkTheme);

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: UserTheme) => {
    if(nextView === null) return; 
    if(nextView === 'system') {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      console.log(systemDarkMode)
      setUserDarkMode(systemDarkMode)
      localStorage.setItem("userTheme", "system");
    }
    else{
      const darkMode = nextView === 'dark';
      localStorage.setItem("userTheme", darkMode ? "dark" : "light");
      setUserDarkMode(darkMode)
    }
    setView(nextView);
    setUserDarkTheme(nextView)
  };

  return(
    <Box>
      <Box display="flex" justifyContent="flex-start" style={{margin: 4}}>
        <IconButton onClick={() => backToBase()}>
          <ArrowBackIcon/>
        </IconButton>
        <Typography style={{paddingTop: 3, paddingLeft: 5}} variant="h6">Design</Typography>
      </Box>
      <Divider/>
      <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
      sx={{ alignItems: 'flex-start' }} // override styles here
    >        
      <ToggleButton value="system" aria-label="system" sx={{width: "100%"}}>
        <Box display="flex" justifyContent="flex-start" alignItems="left" sx={{width: '100%'}}>
          <ImportantDevicesIcon />
          <Typography textAlign="left" sx={{paddingLeft: 2, textTransform: 'none'}}>Gerätedesign Design</Typography>
        </Box>
      </ToggleButton>
      <ToggleButton value="dark" aria-label="dark" sx={{width: "100%"}}>
        <Box display="flex" justifyContent="flex-start" alignItems="left" sx={{width: '100%'}}>
          <DarkModeIcon />
          <Typography textAlign="left" sx={{paddingLeft: 2, textTransform: 'none'}}>Dunkles Design</Typography>
        </Box>
      </ToggleButton>
      <ToggleButton value="light" aria-label="light" sx={{width: "100%"}}>
        <Box display="flex" justifyContent="flex-start" alignItems="left" sx={{width: '100%'}}>
          <LightModeIcon />
          <Typography textAlign="left" sx={{paddingLeft: 2, textTransform: 'none'}}>Helles Design</Typography>
        </Box>
      </ToggleButton>
    </ToggleButtonGroup>
  </Box>
  )
}

export default ThemeMenu;