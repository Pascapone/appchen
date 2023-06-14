"use client"

import React, { useState } from 'react'
import { RestAPI } from '@/restapi/RestAPI'
import { useEffect } from 'react'

import { dateToGermanString } from '@/utils/dateUtils'
import { Box, Typography, Divider, Tabs, Tab, Card, IconButton, Grid, Backdrop, CircularProgress, Button, ButtonGroup } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'

import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'

import CourseAssignments from './components/CourseAssignments'
import CourseActions from './components/CourseActions'
import { GetCourseWithUsersQuery } from '@/GraphQL'

import { useOpenUserRevisionStore } from '@/store/routeStore'

type CourseModel = GetCourseWithUsersQuery['getCourse']

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Course = ({params, signOut, user}: any) => {
  const [courseModel, setCourseModel] = useState<CourseModel | null>(null)
  const [tabIndex, setTabIndex] = useState(0);  
  const [submitting, setSubmitting] = useState(false)

  const [ consumeable ] = useOpenUserRevisionStore(state => [state.consumeable])


  useEffect(() => {
    if (consumeable) {
      setTabIndex(2)
    }
  }, [])

  const router = useRouter()

  const handleChangeIndex = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleGetCourseModel = async (courseId: string) => {
    try {
      const course = await RestAPI.course.getCourseWithUsers(courseId) as CourseModel
      console.log("Kurs Model", course)
      setCourseModel(course)
    } catch (err) {
      console.log(err)
    }
  }  

  useEffect(() => {
    handleGetCourseModel(params.courseId)
    return () => {
    }
  }, [])
  console.log("User Authenticator", user.attributes.sub)
  console.log(courseModel)
  
  return (
    <Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submitting}
        title='Kurs verlassen...'            
      >
        <CircularProgress />        
      </Backdrop>
      <Box>
        <ButtonGroup sx={{paddingBottom: 2}}>          
          <Button variant='outlined' onClick={() => router.push('/courses')}>
            <ArrowBackIcon/>
          </Button>
        </ButtonGroup>
      </Box>
      <Typography variant='h5'>
        Kurs: {courseModel?.name} - {courseModel?.level}
      </Typography>      
      <Divider sx={{paddingBottom: 1}}/>
      <Box display='flex' flexDirection='row' paddingTop={1}>
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
          <Typography variant='body1' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
            Anzahl Teilnehmer:
          </Typography>
          <Typography variant='body1' noWrap sx={{fontWeight: 'bold'}} paddingRight={1}>
            Kurs-Id:
          </Typography>
        </Box>
        <Box>
          <Typography noWrap variant='body1'>
            {courseModel?.name}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseModel?.level}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseModel?.ownerName}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseModel?.startDate ? dateToGermanString(new Date(courseModel?.startDate)) : 'None'}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseModel?.endDate ? dateToGermanString(new Date(courseModel?.endDate)) : 'None'}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseModel?.users?.items.length}
          </Typography>
          <Typography noWrap variant='body1'>
            {courseModel?.id}
          </Typography>
        </Box>
      </Box>  
      <Divider sx={{paddingBottom: 1}}/>  
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleChangeIndex} aria-label="basic tabs example">
            <Tab label="Teilnehmer" {...a11yProps(0)} />
            <Tab label="Aktionen" {...a11yProps(1)} />
            <Tab label="Aufgaben" {...a11yProps(2)} />
            <Tab label="Materialien" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <Grid container spacing={1} paddingBottom={2}>          
            {courseModel?.users?.items.map((relationItem: any) => {            
              const user = relationItem.user
              console.log("User", user)
              return (
                <Grid item xs={12} md={6} lg={4} xl={4} key="Add Course Card">
                  <Card sx={{height: "100%"}}>                          
                    <Box display='flex' flexDirection='row' justifyContent='space-between' padding={1} paddingLeft={2}>
                        <Typography noWrap variant="body2" alignSelf='center'>
                          {user.name}
                        </Typography>   
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>    
                      </Box>             
                  </Card>  
                </Grid>
              )
            })}          
          </Grid>          
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <CourseActions 
            courseModel={courseModel!} 
            user={user} 
            submitting={submitting} 
            setSubmitting={setSubmitting} 
            handleGetCourseModel={handleGetCourseModel}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
        <CourseAssignments refreshCourseModel={() => handleGetCourseModel(params.courseId)} courseModel={courseModel}/>
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          Materialien
        </TabPanel>
      </Box>
    </Box>
  )
}

export default withAuthenticator(Course)