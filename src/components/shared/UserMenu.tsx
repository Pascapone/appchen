import { useEffect, useState } from 'react';
import { Typography, IconButton, Avatar, MenuItem, Menu } from '@mui/material';
import { Auth, Hub } from 'aws-amplify'
import { useUserStore } from '@/store/userStore';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'] as const;
type Setting = typeof settings[number];

export default function UserMenu(){
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
  const [userId] = useUserStore((state) => [state.userId])
  


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
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

  const handleCloseUserMenu = (setting: Setting) => {
    console.log(setting);
    switch (setting) {
      case "Logout":
        handleLogout();
        break;
      case "Account":
        handleAccount();
        break;
      case "Dashboard":
        handleDashboard();
        break;
    
      default:
        break;
    }
    setAnchorElUser(null);
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
        {settings.map((setting: Setting) => (
          <MenuItem key={setting} onClick={(e) => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}