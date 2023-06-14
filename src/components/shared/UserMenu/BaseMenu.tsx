import { Divider, Box } from '@mui/material';

import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import ExpandableMenuItem, { ExpandableSetting } from './ExpandableMenuItem'
import BasicMenuItem, { BasicSetting } from './BasicMenuItem'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const BaseMenu = ({handleCloseUserMenu, handleExpandMenu}: {handleCloseUserMenu: (setting: BasicSetting) => void, handleExpandMenu: (setting: ExpandableSetting) => void}) => {
  return(
    <Box>
      <BasicMenuItem setting={"Profile"} icon={AccountBoxIcon} onClick={handleCloseUserMenu}/>
      <ExpandableMenuItem setting={"Theme"} icon={SettingsBrightnessIcon} onClick={handleExpandMenu}/>
      <Divider/>
      <BasicMenuItem setting={"Logout"} icon={LogoutIcon} onClick={handleCloseUserMenu}/>
    </Box>
  )
}

export default BaseMenu;