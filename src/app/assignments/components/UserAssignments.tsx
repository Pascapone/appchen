import React, { useEffect, useState } from 'react'
import { RestAPI } from '@/restapi/RestAPI'
import { useUserStore } from '@/store/userStore'
import { Grid, Typography } from '@mui/material'
import UserAssignmentCard from './UserAssignmentCard'

import { GetUserAssignmentsQuery } from '@/GraphQL'
import { useRouter } from 'next/navigation'

type UserAssignmentModel = GetUserAssignmentsQuery['getUser']

function UserAssignments() {

  const [userModel, setUserModel] = useState<UserAssignmentModel>(null)
  const [ userId ] = useUserStore(state => [state.userId]) 

  const router = useRouter()

  const getUserAssignments = async () => {
    const user = await RestAPI.assignment.getUserWithAssignments(userId).catch(err => {
      console.log(err)
      return
    }) as UserAssignmentModel

    setUserModel(user)
  }

  useEffect(() => {
    getUserAssignments()
  }, [])

  return (
    <>
      <Typography variant='h4'>Deine Aufgaben</Typography>
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
                userAssignmentId: assignment!.id

              }}
              actions={[{
                name: 'Teilnehmen',
                onClick: () => router.push(`/assignment/${assignment!.id}`),
                color: 'primary',
                variant: 'contained'
              }]}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default UserAssignments