import { useState } from 'react';
import { IconButton, Avatar, Menu } from '@mui/material';
import { Auth } from 'aws-amplify'
import { useUserStore } from '@/store/userStore';

import { ExpandableSetting } from './ExpandableMenuItem'
import { BasicSetting } from './BasicMenuItem'

import BaseMenu from './BaseMenu'

import ThemeMenu from './ThemeMenu'

type MenuView = 'Base' | 'Theme'

export default function UserMenu(){
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [menuView, setMenuView] = useState<MenuView>('Base');

  const [userId] = useUserStore((state) => [state.userId])
  

  const showMenu = (view: MenuView) => {
    switch (view) {
      case 'Base':
        return <BaseMenu handleCloseUserMenu={handleClickMenuButton} handleExpandMenu={handleExpandMenu}/>
      case 'Theme':
        return <ThemeMenu backToBase={backToBaseMenuView}/>
    }
  }

  const backToBaseMenuView = () => {
    setMenuView('Base')
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    backToBaseMenuView()
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = async () => {
    Auth.signOut();    
    // const user = await Auth.currentAuthenticatedUser()
    
    // console.log(user);
    console.log('handle logout');
  }

  const handleAccount = async () => {
    console.log(userId)
  }
  
  const handleDashboard = async () => {
    console.log("Click Dashboard")
  }

  const handleClickMenuButton = (setting: BasicSetting) => {
    console.log(setting);
    switch (setting) {
      case "Logout":
        handleLogout();
        break;
      case "Account":
        handleAccount();
        break;
      case "Dashboard Super":
        handleDashboard();
        break;
    
      default:
        break;
    }
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = (setting: BasicSetting) => {   
    setAnchorElUser(null);    
  };

  const handleExpandMenu = (setting: ExpandableSetting) => {
    console.log(setting);
    switch (setting) {
      case "Theme":        
        setMenuView('Theme')
        break;
    
      default:
        break;
    }
  };

  return(
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar src="path/to/avatar-image.jpg" alt="User Avatar" />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {showMenu(menuView)}
      </Menu>
    </>
  )
}