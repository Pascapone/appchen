import { Divider, Box } from '@mui/material';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import ExpandableMenuItem, { ExpandableSetting } from './ExpandableMenuItem'
import BasicMenuItem, { BasicSetting } from './BasicMenuItem'

const BaseMenu = ({handleCloseUserMenu, handleExpandMenu}: {handleCloseUserMenu: (setting: BasicSetting) => void, handleExpandMenu: (setting: ExpandableSetting) => void}) => {
  return(
    <Box>
      <BasicMenuItem setting={"Profile"} icon={AcUnitIcon} onClick={handleCloseUserMenu}/>
      <ExpandableMenuItem setting={"Theme"} icon={SettingsBrightnessIcon} onClick={handleExpandMenu}/>
      <Divider/>
      <BasicMenuItem setting={"Logout"} icon={AcUnitIcon} onClick={handleCloseUserMenu}/>
    </Box>
  )
}

export default BaseMenu;