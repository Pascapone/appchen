import React, { useEffect, useState } from 'react'
import { RestAPI } from '@/restapi/RestAPI'
import { useUserStore } from '@/store/userStore'
import { Grid, Typography } from '@mui/material'
import UserAssignmentCard from './UserAssignmentCard'

import { GetUserAssignmentsQuery } from '@/GraphQL'
import { useRouter } from 'next/navigation'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import { useOpenUserRevisionStore } from '@/store/routeStore'

type UserAssignmentModel = GetUserAssignmentsQuery['getUser']

function UserAssignments() {

  const [userModel, setUserModel] = useState<UserAssignmentModel>(null)
  const [ userId ] = useUserStore(state => [state.userId]) 
  const [submitting, setSubmitting] = useState(false)
  const [openApplyDialog, setOpenApplyDialog] = useState(false)
  const [applyUserAssignmentId, setApplyUserAssignmentId] = useState('')

  const [ setOpenUserRevisionRouteParams ] = useOpenUserRevisionStore(state => [state.setRouteParams])

  const router = useRouter()

  const getUserAssignments = async () => {
    const user = await RestAPI.assignment.getUserWithAssignments(userId).catch(err => {
      console.log(err)
      return
    }) as UserAssignmentModel

    setUserModel(user)
  }

  const handleApplyAssignment = (assignmentId: string) => {
    setApplyUserAssignmentId(assignmentId)
    setOpenApplyDialog(true)
  }

  const confirmApplyAssignment = () => {    
    router.push(`/assignment/${applyUserAssignmentId}`)
  }

  const handleOpenUserRevision = (userAssignmentId: string, courseAssignmentId: string | null | undefined, courseId: string | undefined) => {
    if(!courseAssignmentId || !courseId) {
      console.log("NO COURSE ASSIGNMENT ID OR COURSE ID")
      console.log("COURSE ASSIGNMENT ID", courseAssignmentId)
      console.log("COURSE ID", courseId)
      return
    }
    setOpenUserRevisionRouteParams(userAssignmentId, courseAssignmentId)
    router.push(`/courses/${courseId}`)
  }

  useEffect(() => {
    getUserAssignments()
  }, [])

  return (
    <>
      <Typography variant='h4'>Deine Aufgaben</Typography>
      <ConfirmDialog
        open={openApplyDialog}
        dialogText='Bist du sicher, dass du diese Aufgabe starten möchtest? Du kannst die Aufgabe nicht mehr abbrechen. Du musst sie innerhalb des Zeitlimits bearbeiten, sobald du sie gestartet hast.'
        handleCancel={() => setOpenApplyDialog(false)}
        handleConfirm={confirmApplyAssignment}
        submitting={submitting}
        confirmButtonText='Teilnehmen'
        dialogStyle='success'
        permanentWarning={true}
        title='Aufgabe bearbeiten'
      />
      <Grid container spacing={1} paddingBottom={2} paddingTop={2}>
        {userModel?.textAssignmentsUser?.items.map((assignment) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={assignment!.id}>
            <UserAssignmentCard 
              data={{
                type: 'Textproduktion',
                courseName: assignment!.textAssignmentCourse!.course.name,
                courseLevel: assignment!.textAssignmentCourse!.course.level,
                description: assignment!.textAssignmentCourse!.textAssignment.description,
                name: assignment!.textAssignmentCourse!.textAssignment.name,
                level: assignment!.textAssignmentCourse!.textAssignment.level,
                ownerName: assignment!.textAssignmentCourse!.textAssignment.owner.name,
                submission: assignment!.submission,
                timeLimit: assignment!.textAssignmentCourse!.timeLimit,
                dueDate: assignment!.textAssignmentCourse!.dueDate,
                userAssignmentId: assignment!.id,
                revision: assignment!.revision
              }}
              actions={[{
                name: 'Teilnehmen',
                onClick: () => handleApplyAssignment(assignment!.id),
                color: 'primary',
                variant: 'contained',
                hide: assignment!.submission !== null
              },
              {
                name: 'Korrektur',
                onClick: () => handleOpenUserRevision(assignment!.id, assignment!.textAssignmentCourseId, assignment?.textAssignmentCourse?.courseId),
                color: 'primary',
                variant: 'contained',
                hide: assignment!.revision === null
              }
            ]}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default UserAssignments