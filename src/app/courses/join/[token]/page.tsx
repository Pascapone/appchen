"use client"
import React, { useState, useEffect } from 'react'
import { Box, Typography, Backdrop, Button, CircularProgress } from '@mui/material'
import { dateToGermanString } from '@/utils/dateUtils'
import { RestAPI } from '@/restapi/RestAPI'
import { useRouter } from 'next/navigation'

import jwt from 'jsonwebtoken'

export default function JoinCourse({params}: any) {
  const [courseName, setCourseName] = useState('')
  const [courseLevel, setCourseLevel] = useState('')
  const [ courseOwnerName, setCourseOwnerName] = useState('')
  const [ courseStartDate, setCourseStartDate] = useState('')
  const [ courseEndDate, setCourseEndDate] = useState('')
  const [ courseId, setCourseId] = useState('')
  const [ token, setToken] = useState('')
  const [ submitting, setSubmitting] = useState(false)

  const router = useRouter()

  const decodeToken = async (token: string) => {
    const payload = jwt.decode(token)

    if(payload !== null && typeof payload === 'object') {  
      setCourseName(payload.courseName)    
      setCourseLevel(payload.courseLevel)
      setCourseOwnerName(payload.courseOwnerName)
      setCourseStartDate(dateToGermanString(new Date(payload.courseStartDate)))
      setCourseEndDate(dateToGermanString(new Date(payload.courseEndDate)))
      setCourseId(payload.courseId)
      setToken(token)
    }
  }

  const handleJoinCourse = async () => {    
    setSubmitting(true)
    await RestAPI.course.joinCourseWithLink(token).catch(err => {
      console.log(err)
    })
    router.push(`/courses/${courseId}`)
  }

  useEffect(() => {
    decodeToken(params.token)
    return () => {
    }
  }, [])

  console.log("Token", params.token)
  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submitting}
        title='Kurs beitreten...'            
      >
        <CircularProgress />        
      </Backdrop> 
      <Typography variant='h5' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
        Kurseinladung
      </Typography>
      <Typography variant='body2' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
        Sie wurden zu folgendem Kurs eingeladen:
      </Typography>
      <Box display='flex' flexDirection='row' paddingTop={1} paddingBottom={2}>
        <Box paddingRight={2}>
          <Typography variant='body1' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
            Kursname:
          </Typography>
          <Typography variant='body1' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
            Kursstufe:
          </Typography>
          <Typography variant='body1' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
            Kursersteller:
          </Typography>
          <Typography variant='body1' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
            Kursbeginn:
          </Typography>
          <Typography variant='body1' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
            Kursende:
          </Typography>
        </Box>
        <Box>
          <Typography noWrap variant='body1'>
            {courseName}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseLevel}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseOwnerName}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseStartDate}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseEndDate}
          </Typography>
        </Box>
      </Box>  
      <Button variant="contained" color="success" onClick={handleJoinCourse}>Kurs beitreten</Button>
    </Box>
  )
}
