"use client"

import React, { useState } from 'react'
import { RestAPI } from '@/restapi/RestAPI'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import InviteLinkDialog from './InviteLinkDialog'
import { Box, Typography, Divider, Backdrop, CircularProgress, Button } from '@mui/material'

function CourseActions({user, courseModel, submitting, setSubmitting, handleGetCourseModel}: {user: any, courseModel: any, submitting: boolean, setSubmitting: (submitting: boolean) => void, handleGetCourseModel: (courseId: string) => void}) {
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
      <Box sx={{paddingTop: 1}}>
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
                </Box>            
              </Box>
            </>
          }      
    </div>
  )
}

export default CourseActions