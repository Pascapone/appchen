"use client"

import { useEffect, useState } from 'react'
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import { RestAPI } from '@/restapi/RestAPI'
import { useUserStore } from '@/store/userStore'
import { Card, Grid, CardContent, Typography, CardHeader, CardActionArea, Box, CardActions, Button, TextField} from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import Link from 'next/link'

import CourseCard from './components/CourseCard'
import { useRouter } from 'next/navigation'

import { useTheme } from '@mui/material'

const Courses = ({signOut, user}: WithAuthenticatorProps) => {  
  const [userId, userGroups] = useUserStore(state => [state.userId, state.userGroups])
  const [courses, setCourses] = useState<any[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [deleteCourseId, setDeleteCourseId] = useState('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const theme = useTheme()
  const router = useRouter()

  const handleGetUserCourses = async () => {
    const courses = await RestAPI.course.getUserCourses(userId).catch(err => {
      console.log(err)
      return
    })
    console.log("User Courses:", courses)
    setCourses(courses)
  }  

  const submitDeleteCourse = async () => {
    setSubmitting(true)
    await RestAPI.course.deleteCourse(deleteCourseId).catch(err => {
      console.log(err)
    })
    setSubmitting(false)
    setOpenDeleteDialog(false)
    handleGetUserCourses()
  }    

  const handleOpenCourse = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  useEffect(() => {
    handleGetUserCourses()
    
    return () => {    
    }
  }, [])
  

  return (
    <div>        
      <ConfirmDialog 
        title="Kurs Löschen" 
        dialogText='Sind Sie sicher, dass Sie den Kurs löschen wollen?'
        confirmButtonText='Löschen'
        permanentWarning={true}
        dialogStyle='error'
        open={openDeleteDialog} 
        submitting={submitting} 
        handleCancel={() => {setOpenDeleteDialog(false)}} 
        handleConfirm={submitDeleteCourse}
      />         
      <Typography variant='h4' noWrap sx={{fontWeight: 'bold'}} paddingBottom={2}>
        Courses
      </Typography>            
      <Grid container spacing={2}>
        {courses.map(course => {
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={course.id}>
                <CourseCard course={course} handleOpenCourse={() => handleOpenCourse(course.id)}/>
              </Grid>
            )
          })
        }
        { courses.length === 0 && (
          <Grid item xs={12} key="no-courses">
            <Card>
              <CardHeader   
                title={`Keine Kurse vorhanden`}
              />
              <CardContent> 
                <Typography>
                  Derzeit sind Sie nicht in einem Kurs eingeschrieben. Fragen Sie Ihren Kursleiter nach einem Kurscode.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          )

        }
        {
          userGroups?.includes("admin") &&  (
            <Grid item xs={12} md={6} lg={4} xl={3} key="Add Course Card">              
                <Card sx={{height: "100%"}}>     
                  <CardActionArea sx={{height: "100%"}} LinkComponent={Link} href='/courses/create'>
                    <CardHeader   
                      title={`Erstelle einen neuen Kurs`}
                    />
                    <CardContent>       
                      <Box display="flex" justifyContent="center" alignItems="center">              
                        <Typography color="secondary">
                          <ControlPointIcon sx={{ fontSize: 100 }}/>
                        </Typography>
                      </Box> 
                    </CardContent>      
                  </CardActionArea>           
                </Card>             
              </Grid>
          )
        }
      </Grid>
    </div>
  )
}
export default withAuthenticator(Courses);