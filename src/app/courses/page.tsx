"use client"

import { useEffect, useState } from 'react'
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import { createJoinCourse } from '@/restapi/course'
import { Level } from '@/GraphQL'
import { useUserStore } from '@/store/userStore'
import { getUserCourses } from '@/restapi/course'
import { Card, Grid, CardContent, Typography, CardHeader, CardActionArea, ButtonBase } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Courses = ({signOut, user}: WithAuthenticatorProps) => {  
  const [userId, userGroups] = useUserStore(state => [state.userId, state.userGroups])
  const [courses, setCourses] = useState<any[]>([])

  console.log(user?.username)
  console.log(user?.attributes)

  const handleCreateJoinCourse = async () => {
    await createJoinCourse("test", Level.B12, userId)
    handleGetUserCourses()
  }

  const handleGetUserCourses = async () => {
    const courses = await getUserCourses(userId)
    setCourses(courses)
  }

  useEffect(() => {
    handleGetUserCourses()
    
    return () => {    
    }
  }, [])
  

  return (
    <div>      
      Courses
      <button onClick={handleCreateJoinCourse}>Create and Join Course</button>     
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
                    </Typography>
                  </CardContent>                  
                </Card>
              </Grid>
            )
          })
        }
        {
          userGroups?.includes("admin") &&  (
            <Grid item xs={6} key="Add Course Card">              
                <Card sx={{height: "100%"}}>     
                  <CardActionArea onClick={() => console.log("TEST")}>
                    <CardContent>                      
                      <Typography textAlign={"center"} color="secondary">
                        <ControlPointIcon sx={{ fontSize: 100 }}/>
                      </Typography>
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