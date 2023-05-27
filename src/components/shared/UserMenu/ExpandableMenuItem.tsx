import { Typography, MenuItem, Box } from '@mui/material';
import { SvgIconComponent } from "@mui/icons-material";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


export type ExpandableSetting = 'Settings with super long text' | 'Theme' | 'Feedback'

const ExpandableMenuItem = ({setting, icon, onClick}: {setting: ExpandableSetting, icon: SvgIconComponent, onClick: (setting: ExpandableSetting) => void}) => {
  const Icon = icon
  return(
    <MenuItem key={setting} onClick={() => onClick(setting)}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box display="flex" alignItems="center">
          <Icon/>
          <Typography textAlign="center" sx={{paddingLeft: 2}}>{setting}</Typography>
        </Box>
        <KeyboardArrowRightIcon sx={{marginLeft: 1}}/>
      </Box>
    </MenuItem>
  )
}

export default ExpandableMenuItem;