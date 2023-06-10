"use client"

import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import AdminAssignments from './components/AdminAssignments'
import UserAssignments from './components/UserAssignments'

import { useUserStore } from '@/store/userStore'

function Assignments() {  

  const [ userGroups ] = useUserStore(state => [state.userGroups])  

  return (
    <>
      {userGroups.some((group: string) => ['admin', 'superAdmin'].includes(group)) ?
        <AdminAssignments />
        :
        <UserAssignments />
      }
    </>
  )
}

export default Assignments