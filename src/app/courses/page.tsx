"use client"

import { useEffect, useState } from 'react'
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import { RestAPI } from '@/restapi/RestAPI'
import { useUserStore } from '@/store/userStore'
import { Card, Grid, CardContent, Typography, CardHeader, CardActionArea, Box, CardActions, Button, TextField} from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteDialog from '@/components/dialogs/DeleteDialog'
import Link from 'next/link'

const Courses = ({signOut, user}: WithAuthenticatorProps) => {  
  const [userId, userGroups] = useUserStore(state => [state.userId, state.userGroups])
  const [courses, setCourses] = useState<any[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [courseId, setCourseId] = useState('')
  const [courseUserId, setCourseUserId] = useState('')
  const [deleteCourseId, setDeleteCourseId] = useState('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleGetUserCourses = async () => {
    const courses = await RestAPI.course.getUserCourses(userId).catch(err => {
      console.log(err)
      return
    })
    console.log("User Courses:", courses)
    setCourses(courses)
  }  

  const handleDeleteCourse = async (courseId: string) => {
    setDeleteCourseId(courseId)
    setOpenDeleteDialog(true)    
  }

  const handleGetCourseModel = async (courseId: string) => {
    const course = await RestAPI.course.getCourse(courseId).catch(err => {
      console.log(err)
    })
    console.log(course)
  }

  const handleJoinUserToCourse = async () => {
    RestAPI.course.joinUserToCourse(courseUserId, courseId)
  }

  const submitDeleteCourse = async () => {
    setSubmitting(true)
    await RestAPI.course.deleteCourse(deleteCourseId).catch(err => {
      console.log(err)
    })
    setSubmitting(false)
    setOpenDeleteDialog(false)
  }

  // TODO: Leave Course Functionality
  const handleLeaveCourse = async (courseId: string) => {
    await RestAPI.course.leaveCourse(courseId).catch(err => {
      console.log(err)
    })
  }

  const onChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {    
    switch (event.target.id) {
      case "KursId":
        setCourseId(event.target.value)
        break;
      case "UserId":
        setCourseUserId(event.target.value)
        break;    
      default:
        break;
    }
    
    event.target.id
  }

  useEffect(() => {
    handleGetUserCourses()
    
    return () => {    
    }
  }, [])
  

  return (
    <div>        
      <DeleteDialog 
        title="Kurs Löschen" 
        deleteText='Sind Sie sicher, dass Sie den Krus löschen wollen?' 
        open={openDeleteDialog} 
        submitting={submitting} 
        handleCancel={() => {setOpenDeleteDialog(false)}} 
        handleConfirm={submitDeleteCourse}
      />         
      Courses
      <TextField
        autoFocus
        margin="dense"
        id="KursId"
        label="KursId"
        type="text"
        fullWidth
        variant="standard"
        onChange={onChangeInputField}
      />
      <TextField
        autoFocus
        margin="dense"
        id="UserId"
        label="UserId"
        type="text"
        fullWidth
        variant="standard"
        onChange={onChangeInputField}
      />
      <Button onClick={handleJoinUserToCourse} size="small">Join User to Group</Button>
      <Grid container spacing={2}>
        {courses.map(course => {
            return (
              <Grid item xs={6} key={course.id}>
                <Card sx={{height: "100%"}}>
                  <CardHeader   
                    title={`${course.name} - ${course.level}`}
                    subheader="September 14, 2016"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun meal to cook
                      together with your guests. Add 1 cup of frozen peas along with the mussels,
                      if you like.
                      This impressive paella is a perfect party dish and a fun meal to cook
                      together with your guests. Add 1 cup of frozen peas along with the mussels,
                      if you like.
                    </Typography>
                  </CardContent>        
                  <CardActions>
                    <Button onClick={() => handleDeleteCourse(course.id)} size="small">Delete Course</Button>
                    <Button onClick={() => handleGetCourseModel(course.id)} size="small">Get Course Model</Button>
                    <Button onClick={() => handleLeaveCourse(course.id)} size="small">Leave Course</Button>
                  </CardActions>          
                </Card>
              </Grid>
            )
          })
        }
        {
          userGroups?.includes("admin") &&  (
            <Grid item xs={6} key="Add Course Card">              
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