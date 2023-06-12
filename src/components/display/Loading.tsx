import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'


function Loading({submitting}: {submitting: boolean}) {
  return (
    <Backdrop
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={submitting}         
    >
      <CircularProgress />        
    </Backdrop>         
  )
}

export default Loading