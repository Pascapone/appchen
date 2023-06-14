"use client"

import React, { useEffect, useState } from 'react'
import SubmissionEditor from '../components/SubmissionEditor'
import { RestAPI } from '@/restapi/RestAPI'
import { useUserStore } from '@/store/userStore'
import { GetTextAssignmentUserQuery } from '@/GraphQL';
import { Paper, Typography, Box } from '@mui/material'
import { msToAWSDateTime, dateToGermanString } from '@/utils/dateUtils';
import { useTheme } from '@mui/material'

type TextAssignmentUserQuery = GetTextAssignmentUserQuery['getTextAssignmentUser']

const ERROR_TIME = 1000 * 60 * 5
const WARNING_TIME = 1000 * 60 * 15

function Assignment({params}: any) {
  const [ userId ] = useUserStore(state => [state.userId])
  const [remainingTime, setRemainingTime] = useState(0)
  const [assignment, setAssignment] = useState<TextAssignmentUserQuery>(null)
  const userAssignmentId = params.userAssignmentId

  const theme = useTheme()

  let timer: NodeJS.Timer

  const timerColor = (time: number) => {
    if(time <= ERROR_TIME) return theme.palette.error.main
    if(time <= WARNING_TIME) return theme.palette.warning.main
    return theme.palette.text.primary
  }

  const startAssignment = async () => {   
    const response = await RestAPI.assignment.startUserAssignment(userAssignmentId).catch(err => {
      console.log('Error: startUserAssignment')
      console.log(err)
    })
  }

  const getUserAssignment = async () => {
    const userAssignment = await RestAPI.assignment.getUserAssignment(userAssignmentId).catch(err => {       
      console.log(err)  
    })

    if(userAssignment === undefined || !userAssignment) return false
    setAssignment(userAssignment)    
  }

  const initalizeAssignment = async () => {
    await startAssignment()
    await getUserAssignment()
  }

  const updateRemainingTime = () => {
    timer = setInterval(() => {
      if(assignment == null || assignment?.endTime == null) return
      
      const now = new Date()
      const end = new Date(assignment!.endTime!)
      const timeLeft = end.getTime() - now.getTime()
      if(timeLeft < 0) {
        setRemainingTime(0)
      }
      else{
        setRemainingTime(timeLeft)
      }

    }, 5000)
  }

  useEffect(() => {
    initalizeAssignment()
  }, [])

  useEffect(() => {
    updateRemainingTime()
  
    return () => {
      clearInterval(timer)
    }
  }, [assignment]) 

  return (
    <div>      
      {assignment?.userId === userId && 
      <>
        
        <div style={{display: 'flex', justifyContent: 'right', width: '100%', flexDirection: 'column', alignItems: 'center'}}>
          
          <div style={{width: '100%', maxWidth: 1200}}>                  
            <Typography variant='h4'>{assignment?.textAssignmentCourse?.textAssignment?.name}</Typography>                    
            <Paper elevation={2} sx={{width: "fit-content", margin: 2, padding: 1, position: "sticky", top: 0, zIndex: (theme) => theme.zIndex.drawer + 1}}>
              <Typography variant='h5' color={timerColor(remainingTime)} fontWeight={700}>Verbleibende Zeit:</Typography>
              <Typography variant='h5' color={timerColor(remainingTime)} fontWeight={700}>{msToAWSDateTime(remainingTime).slice(0, -4)}</Typography>
            </Paper>            
            <Box paddingBottom={2}>              
              <iframe src="http://docs.google.com/gview?url=https://drive.google.com/uc?id=1ePh-ocUWPKvPdKvXKx2-mGsGa9nf5Fmn&embedded=true" style={{width: '100%', height: '700px'}}></iframe>
            </Box>
            <Box>
              <Typography variant='h6' paddingBottom={2} fontWeight={700}>Deine Textproduktion</Typography>
              <SubmissionEditor textAssignmentUserId={assignment.id}/>
            </Box>
          </div>
        </div>
      </>
      }      
    </div>
  )
}

export default Assignment