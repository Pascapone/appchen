
import { create } from 'zustand'

interface UserState {
  userId: string
  name: string
  email: string
  userTheme: UserTheme
  darkMode: boolean
  userGroups: string[]
}

export type UserTheme = 'dark' | 'light' | 'system' | null

type UserAction = {
  userLogin: (userId: UserState['userId'], name: UserState['name'], email: UserState['email'], userGroups: UserState['userGroups']) => void
  setUserTheme: (userTheme: UserState['userTheme']) => void
  setDarkMode: (darkMode: UserState['darkMode']) => void
  userLogout: () => void
  hasPermission: (allowedGroups: string[]) => boolean
}

export const useUserStore = create<UserState & UserAction>()((set) => ({
  userId: "",
  name: "",
  email: "",
  userTheme: null,
  darkMode: false,
  userGroups: [],
  userLogin: (userId, name, email, userGroups) => set(() => ({ userId: userId, name: name, email: email, userGroups: userGroups })),  
  setUserTheme: (userTheme) => set(() => ({ userTheme: userTheme })),
  setDarkMode: (darkMode) => set(() => ({ darkMode: darkMode })),
  userLogout: () => set(() => ({ userId: "", name: "", email: "" })),
  hasPermission: (allowedGroups) => { 
    const userGroups = useUserStore.getState().userGroups
    const permission = allowedGroups.some((group) => userGroups.includes(group))
    return permission 
  }
}))