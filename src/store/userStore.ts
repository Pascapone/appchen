
import { create } from 'zustand'

interface UserState {
  userId: string
  name: string
  email: string
  userGroups: string[]
}

type UserAction = {
  userLogin: (userId: UserState['userId'], name: UserState['name'], email: UserState['email'], userGroups: UserState['userGroups']) => void
  userLogout: () => void
}

export const useUserStore = create<UserState & UserAction>()((set) => ({
  userId: "",
  name: "",
  email: "",
  userGroups: [],
  userLogin: (userId, name, email, userGroups) => set(() => ({ userId: userId, name: name, email: email, userGroups: userGroups })),  
  userLogout: () => set(() => ({ userId: "", name: "", email: "" })),
}))