"use client"

import 'antd/dist/reset.css';
import './globals.css'
import { useEffect, useState } from 'react'

import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { AmplifyProvider } from '@aws-amplify/ui-react'

import awsExports from '../aws-exports';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from '@/components/shared/Layout';

import { ConfigProvider, theme } from 'antd';

import { Auth, Hub } from 'aws-amplify'

import { useUserStore } from '@/store/userStore';
import { UserTheme } from '@/store/userStore';

import { ToastContainer } from 'react-toastify';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface CognitoUser {
  username: string,
  attributes: {
    email: string,
    name: string,
    email_verified: boolean,
    sub: string
  },
  signInUserSession: {
    accessToken: {
      payload: {
        "cognito:groups": string[],
      }
    }
  }
}

Amplify.configure(awsExports);

const lightTheme = createTheme({  
  palette: {
    mode: 'light',
    primary: {
      main: '#009c97',
    },
    secondary: {
      main: '#05b0f9',
    },
  }
});

const darkTheme = createTheme({  
  palette: {
    mode: 'dark',
    primary: {
      main: '#009c97',
    },
    secondary: {
      main: '#05b0f9',
    },
  }
});

const darkThemeAntd = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorError: darkTheme.palette.error.main,
  },
}

const lightThemeAntd = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorError: lightTheme.palette.error.main,
  },
}

export const metadata = {
  title: 'Appchen',
  description: 'Learn German with Appchen',
}

const getSystemDarkTheme = () => {
 return window.matchMedia("(prefers-color-scheme: dark)").matches;
}



export default function RootLayout({children}: {children: React.ReactNode}) {

  const [userLogin, userLogout] = useUserStore((state) => [state.userLogin, state.userLogout])
  const [userTheme, setUserTheme] = useUserStore((state) => [state.userTheme, state.setUserTheme])
  const [userDarkMode, setUserDarkMode] = useUserStore((state) => [state.darkMode, state.setDarkMode]) 
  const [didMount, setDidMount] = useState(false)

  // Read user data from Zustand User Store
  const userInfo = useUserStore((state) => ({userId: state.userId, name: state.name, email: state.email}))

  const handleGetUser = async () => {
    const user: CognitoUser = await Auth.currentAuthenticatedUser();
  
    console.log(user)
    userLogin(user.username, user.attributes.name, user.attributes.email, user.signInUserSession.accessToken.payload["cognito:groups"])
  }

  const handleUserSignedOut = async () => {
    userLogout();
  }

  const initializeTheme = () => {
    const localTheme = localStorage.getItem("userTheme");
    if(localTheme === "light") {
      setUserTheme('light');
      setUserDarkMode(false);
    } else if(localTheme === "dark") {    
      setUserTheme('dark');
      setUserDarkMode(true);
    } else {    
      setUserTheme('system');
      setUserDarkMode(getSystemDarkTheme());
    }
  }

  if(userTheme === null) {
    initializeTheme();
    setDidMount(true)  
  }  

  useEffect(() => {
    // Create listener for auth events
    const listener = (data: any) => {
      switch (data.payload.event) {        
        case 'signIn':
          handleGetUser();
          break;    
        case 'signOut':
          handleUserSignedOut()
          break;
      }
    }    

    // Subscribe to auth events
    Hub.listen('auth', listener);

    handleGetUser()
  
    return () => {      
    }
  }, [])

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={userDarkMode ? darkTheme : lightTheme}>
          <ConfigProvider theme={userDarkMode ? darkThemeAntd: lightThemeAntd}>
            <AmplifyProvider>    
              <ToastContainer 
                position="bottom-left"
              />        
              <Layout>
                {children}
              </Layout>
            </AmplifyProvider>
          </ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}