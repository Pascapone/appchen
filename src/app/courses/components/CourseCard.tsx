import React from 'react'
import { Card, CardActions, CardContent, CardHeader, Typography, Button } from '@mui/material'
import { dateToGermanString } from '@/utils/dateUtils'

import { useTheme } from '@mui/material'

export default function CourseCard({course, handleOpenCourse}: {course: any, handleOpenCourse: (courseId: string) => void}) {

  const theme = useTheme()

  return (
    <Card sx={{height: "100%"}}>
      <CardHeader   
        title={`${course.name} - ${course.level}`}
        subheader={`${dateToGermanString(new Date(course.startDate))} - ${dateToGermanString(new Date(course.endDate))}`}
      />
      <CardContent>
        <Typography variant="body2">
          Kursersteller:
        </Typography>
        <Typography variant="body2" color={theme.palette.info.main}>
          {course.ownerName}
        </Typography>
      </CardContent>        
      <CardActions>
        <Button onClick={() => handleOpenCourse(course.id)} size="small">Kurs Öffnen</Button>
      </CardActions>          
    </Card>
  )
}


