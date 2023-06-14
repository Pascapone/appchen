import { create } from 'zustand'

export interface OpenUserRevisionState {
  consumeable: boolean
  userAssignmentId: string
  courseAssignmentId: string  
}

type OpenUserRevisionAction = {
  setRouteParams: ( userAssignmentId: OpenUserRevisionState['userAssignmentId'], courseAssignmentId: OpenUserRevisionState['courseAssignmentId']) => void
  consumeRouteParams: () => OpenUserRevisionState | null
}

export const useOpenUserRevisionStore = create<OpenUserRevisionState & OpenUserRevisionAction>()((set) => ({
  userAssignmentId: "",
  courseAssignmentId: "",
  consumeable: false,
  setRouteParams: (userAssignmentId, courseAssignmentId) => set({ consumeable: true, userAssignmentId: userAssignmentId, courseAssignmentId: courseAssignmentId }),
  consumeRouteParams: () => {
    const state = useOpenUserRevisionStore.getState() as OpenUserRevisionState

    if(!state.consumeable) return null

    const userAssignmentId = state.userAssignmentId
    const courseAssignmentId = state.courseAssignmentId

    set({ consumeable: false, userAssignmentId: "", courseAssignmentId: "" })

    return { consumeable: true, userAssignmentId, courseAssignmentId }
  }
}))