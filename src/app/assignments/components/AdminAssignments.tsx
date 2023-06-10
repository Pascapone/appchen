"use client"

import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { RestAPI } from '@/restapi/RestAPI'
import AssignmentCard from './AssignmentCard'
import React, { useEffect } from 'react'
import AssignmentDialog from './AssignmentDialog'
import { Level } from '@/GraphQL';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { AssignmentDialogInputs } from './AssignmentDialog'
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore'
import { CardAction } from './AssignmentCard'


function AdminAssignments() {
  const [textAssignments, setTextAssignments] = React.useState([])
  const [openCreateAssignmentDialog, setOpenCreateAssignmentDialog] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [currentValues, setCurrentValues] = React.useState<null | AssignmentDialogInputs>(null)

  const [ userGroups ] = useUserStore(state => [state.userGroups])

  const notifyCreatedAsignment = () => toast.success("Die Aufgabe wurde erfolgreich erstellt.", {
    theme: "colored",
  });

  const getAssignments = async () => {
    const assignments = await RestAPI.assignment.getTextAssignments()
    setTextAssignments(assignments)
    console.log(assignments)
  }

  const handleSubmitCreateAssignment = async (name: string, level: Level, description: string, link: string, timeLimit: string) => {    
    setSubmitting(true)
    await RestAPI.assignment.creatTextAssignment(name, level, description, link, timeLimit)
    await getAssignments()
    setSubmitting(false)
    setOpenCreateAssignmentDialog(false)
    notifyCreatedAsignment()
  }

  const handleEditAssignment = async (currentValues: AssignmentDialogInputs) => {
    setCurrentValues(currentValues)
    console.log(currentValues)
    setOpenCreateAssignmentDialog(true)
  }

  const handleSubmitEditAssignment = async (name: string, level: Level, description: string, link: string, timeLimit: string, assignmentId: string | undefined) => {
    console.log(assignmentId)
    if(assignmentId === undefined) return
    setSubmitting(true)
    await RestAPI.assignment.updateTextAssignment(assignmentId, name, level, description, link, timeLimit)
    await getAssignments()
    setSubmitting(false)
    setOpenCreateAssignmentDialog(false)
  }

  const handleDeleteAssignment = async (id: string) => {
    setOpenDeleteDialog(true)
    setDeleteId(id)
  }

  const handleConfirmDeleteAssignment = async () => {
    setSubmitting(true)
    await deleteTextAssignment()
    await getAssignments()
    setSubmitting(false)
    setOpenDeleteDialog(false)
  }

  const deleteTextAssignment = async () => {
    if(deleteId === null) return
    await RestAPI.assignment.deleteTextAssignment(deleteId)
  }

  const handleOpenCreateAssignmentDialog = () => {
    setOpenCreateAssignmentDialog(true)
    setCurrentValues(null)
  }

  useEffect(() => {
    getAssignments()
  }, [])

  return (
    <Box>
      <AssignmentDialog 
        open={openCreateAssignmentDialog} 
        submitting={submitting} 
        handleCancel={() => setOpenCreateAssignmentDialog(false)}
        handleConfirm={currentValues == null ? handleSubmitCreateAssignment: handleSubmitEditAssignment}
        currentValues={currentValues}
      />
      <ConfirmDialog
        open={openDeleteDialog}
        dialogText='Sind Sie sicher, dass Sie diese Aufgabe löschen wollen?'
        dialogStyle='error'
        permanentWarning={true}
        confirmButtonText='Löschen'
        handleCancel={() => setOpenDeleteDialog(false)}
        handleConfirm={handleConfirmDeleteAssignment}
        submitting={submitting}
      />
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Typography variant='h5' sx={{paddingBottom: 1}}>Aufgaben (Admin)</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' onClick={handleOpenCreateAssignmentDialog}>Neu</Button>
        </Grid>
      </Grid>
      <Divider/>
      <Grid container spacing={1} paddingBottom={2} paddingTop={2}>  
        {textAssignments.map((assignment: any) => {
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={assignment.id}>
                <AssignmentCard 
                  assignment={assignment}
                  assignmentType='Textproduktion'  
                  actions={[
                    {
                      name: 'Bearbeiten',
                      onClick: () => handleEditAssignment({
                        id: assignment.id,
                        name: assignment.name,
                        level: assignment.level,
                        description: assignment.description,
                        link: assignment.link,
                        timeLimit: assignment.timeLimit
                      }),
                      color: 'primary',
                      variant: 'text'
                    },
                    {
                      name: 'Löschen',
                      variant: 'text',
                      color: 'error',
                      onClick: () => handleDeleteAssignment(assignment.id)
                    }
                  ]}
                />
              </Grid>
            )
          })
        }
      </Grid>        
    </Box>
  )
}

export default AdminAssignments