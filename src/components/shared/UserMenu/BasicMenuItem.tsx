import { Typography,MenuItem, Box } from '@mui/material';
import { SvgIconComponent } from "@mui/icons-material";

export type BasicSetting = 'Profile' | 'Account' | 'Dashboard Super' | 'Logout'

const BasicMenuItem = ({setting, icon, onClick}: {setting: BasicSetting, icon: SvgIconComponent, onClick: (setting: BasicSetting) => void}) => {
  const Icon = icon
  return(
    <MenuItem key={setting} onClick={() => onClick(setting)}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box display="flex" alignItems="center">
          <Icon/>          
          <Typography textAlign="center" sx={{paddingLeft: 2}}>{setting}</Typography>
        </Box>        
        <Box sx={{width: '24px', height: '24px', marginLeft: 1}}/>
      </Box>
    </MenuItem>
  )
}

export default BasicMenuItem;