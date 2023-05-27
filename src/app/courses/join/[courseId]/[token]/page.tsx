"use client"
import React, { useState, useEffect } from 'react'
import { Box, Typography, Backdrop, Button, CircularProgress } from '@mui/material'
import { dateToGermanString } from '@/utils/dateUtils'
import { RestAPI } from '@/restapi/RestAPI'
import { useRouter } from 'next/navigation'

import { toast } from 'react-toastify';

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

  const successfullyJoined = () => toast.success("Dem Kurs erfolgreich beigetreten!", {
    theme: "colored",
  });

  const failedJoining = () => toast.error("Der Einladungslink ist nicht gültig!", {
    theme: "colored",
  });

  const getCourseInfo = async (token: string, courseId: string) => {
    console.log("Kurs ID", courseId)
    try {
      const course = await RestAPI.course.getCourseWithUsers(courseId)
      console.log("Kurs Model", course)

      if(course) {  
        setCourseName(course.name)    
        setCourseLevel(course.level)
        setCourseOwnerName(course.ownerName)
        setCourseStartDate(dateToGermanString(new Date(course.startDate)))
        setCourseEndDate(dateToGermanString(new Date(course.endDate)))
        setCourseId(courseId)
        setToken(token)
      }

    } catch (err) {
      console.log(err)
    }    
  }

  const handleJoinCourse = async () => {    
    setSubmitting(true)
    try {
      await RestAPI.course.joinCourseWithLink(token, courseId)
      successfullyJoined()
      router.push(`/courses/${courseId}`)
    } catch (err) {
      console.log(err)
      setSubmitting(false)
      failedJoining()
      router.push(`/courses`)
    }    
  }

  useEffect(() => {
    getCourseInfo(params.token, params.courseId)
    return () => {
    }
  }, [])

  console.log("Token", params.token)
  console.log("Params", params)
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
