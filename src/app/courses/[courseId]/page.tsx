"use client"

import React, { useState } from 'react'
import { RestAPI } from '@/restapi/RestAPI'
import { useEffect } from 'react'

import { dateToGermanString } from '@/utils/dateUtils'

import { Box, Typography, Divider, Tabs, Tab, Card, Backdrop, CircularProgress, ButtonGroup, Button, IconButton, Grid } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useRouter } from 'next/navigation'

import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'

import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import InviteLinkDialog from './components/InviteLinkDialog'

import { toast } from 'react-toastify';

import { updateTest } from '@/restapi/utils'

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
  const [courseModel, setCourseModel] = useState<any>(null)
  const [tabIndex, setTabIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openInviteLinkDialog, setOpenInviteLinkDialog] = useState(false)
  const [openLeaveCourseDialog, setOpenLeaveCourseDialog] = useState(false)

  const router = useRouter()

  const notifyCreatedLink = () => toast.success("Neuen Einladungslink erstellt.", {
    theme: "colored",
  });

  const notifyLeftCourse = () => toast.info("Sie haben den Kurs verlassen.", {
    theme: "colored",
  });

  const notifyDeletedCourse = () => toast.info("Der Kurs wurde permanent gelöscht.", {
    theme: "colored",
  });

  const notifyInvalidateCourseLink = () => toast.info("Der Einladungslink des Kurses wurde deaktiviert.", {
    theme: "colored",
  });


  const handleChangeIndex = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleGetCourseModel = async (courseId: string) => {
    try {
      const course = await RestAPI.course.getCourseWithUsers(courseId)
      console.log("Kurs Model", course)
      setCourseModel(course)
    } catch (err) {
      console.log(err)
    }
  }

  const handleInviteLinkDialog = async () => {
    setOpenInviteLinkDialog(true)
  }

  const handleCreateInviteLink = async (courseId: string) => {
    setSubmitting(true)

    const reponse = await RestAPI.course.createCourseInviteLink(courseId)
    
    await handleGetCourseModel(courseId)
    
    setSubmitting(false)
    notifyCreatedLink()
    console.log("Token", reponse.body.token)
  }

  const handleDeleteCourse = async () => {
    setOpenDeleteDialog(true)    
  }

  const submitDeleteCourse = async () => {
    setSubmitting(true)
    await RestAPI.course.deleteCourse(courseModel.id).catch(err => {
      console.log(err)
    })
    notifyDeletedCourse()
    setSubmitting(false)
    setOpenDeleteDialog(false)
    router.push('/courses')
  }

  const submitLeaveCourse = async () => {
    setSubmitting(true)
    await RestAPI.course.leaveCourse(courseModel.id).catch(err => {
      console.log(err)
    })
    notifyLeftCourse()
    router.push('/courses')
  }

  const handleInvalidateToken = async () => {
    setSubmitting(true)
    await RestAPI.course.invalidateInviteLink(courseModel.id).catch(err => {
      console.log(err)
    })
    await handleGetCourseModel(courseModel.id)
    setSubmitting(false)
    notifyInvalidateCourseLink()
  }

  const handleRequest = async () => {
    console.log("Request")
    await updateTest(courseModel.id, "asdsaf")    
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
      <ConfirmDialog 
        title="Kurs verlassen" 
        dialogText='Sind Sie sicher, dass Sie den Kurs verlasen wollen?'
        confirmButtonText='Verlassen'
        dialogStyle='error'
        open={openLeaveCourseDialog} 
        submitting={submitting} 
        handleCancel={() => {setOpenLeaveCourseDialog(false)}} 
        handleConfirm={submitLeaveCourse}
      /> 
      <InviteLinkDialog
        open={openInviteLinkDialog}
        submitting={submitting}
        handleCancel={() => {setOpenInviteLinkDialog(false)}}
        handleConfirm={() => {handleCreateInviteLink(courseModel.id)}}
        token={courseModel?.inviteToken}
        courseId={courseModel?.id}
        courseLevel={courseModel?.level}
        courseName={courseModel?.name}
        handleInvalidateToken={handleInvalidateToken}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submitting}
        title='Kurs verlassen...'            
      >
        <CircularProgress />        
      </Backdrop>
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
            {dateToGermanString(new Date(courseModel?.startDate))}
          </Typography>
          <Typography noWrap variant='body1'>
            {dateToGermanString(new Date(courseModel?.endDate))}
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
          <Box sx={{paddingTop: 1}}>
            <Typography noWrap variant="h6" alignSelf='center'>
              Aktionen
            </Typography> 
            <Button variant="contained" color="error" onClick={() => setOpenLeaveCourseDialog(true)}>Kurs verlassen</Button>
          </Box>             
          { user.attributes.sub === courseModel?.ownerId && 
            <>
              <Divider sx={{paddingBottom: 1}}/>
              <Box sx={{paddingTop: 1}}>
                <Typography noWrap variant="h6" alignSelf='center'>
                  Admin Options
                </Typography>
                <Box display='flex' flexWrap='wrap' flexDirection='row'>
                  <Box paddingRight={1} paddingBottom={1}>
                    <Button variant="contained" color="primary" onClick={handleInviteLinkDialog}>Einladungslink</Button>      
                  </Box>
                  <Box paddingRight={1} paddingBottom={1}>
                    <Button variant="contained" color="error" onClick={handleDeleteCourse}>Kurs löschen</Button>          
                  </Box>        
                  <Box paddingRight={1} paddingBottom={1}>
                    <Button variant="contained" color="success" onClick={handleRequest}>Conditional Request</Button>          
                  </Box>                     
                </Box>            
              </Box>
            </>
          }      
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          Aufgaben
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          Materialien
        </TabPanel>
      </Box>
    </Box>
  )
}

export default withAuthenticator(Course)