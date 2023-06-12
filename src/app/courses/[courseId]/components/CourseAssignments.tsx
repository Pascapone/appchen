import React, {useEffect, useState} from 'react'
import { Box, Button, Typography, Grid, ButtonGroup, Divider, Link, TextField, Switch, FormControlLabel } from '@mui/material'
import AssignmentCard from '@/app/assignments/components/AssignmentCard'
import CourseAssignmentCard from './CourseAssignmentCard'
import { RestAPI } from '@/restapi/RestAPI'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CardAction } from './CourseAssignmentCard'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'

import { useUserStore } from '@/store/userStore'
import KeyValueComponent from '@/components/display/KeyValueComponent'

import { DatePicker, Space } from 'antd';
import 'dayjs/locale/de';
import locale from 'antd/es/date-picker/locale/de_DE'

import Loading from '@/components/display/Loading';

import { ModelTextAssignmentFilterInput } from '@/GraphQL';
import UserAssignmentCard from  '@/app/assignments/components/UserAssignmentCard'

import { useRouter } from 'next/navigation'
import { GetCourseWithUsersQuery } from '@/GraphQL'

type CourseModel = GetCourseWithUsersQuery['getCourse']

const { RangePicker } = DatePicker;

type DisplayMode = 'list' | 'addList' | 'edit' | 'add'


const DateLimit = ({checked, setDueDate, onChangeDueDateSwitch}: {checked: boolean, setDueDate: (dueDate: Date) => void, onChangeDueDateSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {
  const handleChange = (value: any) => {
    setDueDate(new Date(value))
  }
  
  return(
    <>  
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChangeDueDateSwitch}/>}
        label="Fälligkeitsdatum"
      />
      {checked && 
        <Box>
          <DatePicker onChange={handleChange} locale={locale} format="DD.MM.YYYY" />
        </Box>
      }
    </>
)}
const TimeLimit = ({onChangeInputField, selectedAssignment}: {onChangeInputField: (e: React.ChangeEvent<HTMLInputElement>) => void, selectedAssignment: any}) => (<TextField
  required
  margin="dense"
  id="timeLimit"
  label="Zeitlimit (hh:mm)"
  type="time"
  fullWidth
  variant="standard"
  onChange={onChangeInputField}
  defaultValue={selectedAssignment.timeLimit.slice(0, 5)}
/>)

const AddCourseTextAssignment = ({courseModel, selectedAssignment, setDisplayMode, refreshCourseModel} : {courseModel: any, selectedAssignment: any, setDisplayMode: (displayMode: DisplayMode) => void, refreshCourseModel: () => Promise<void>}) => {
  const [timeLimit, setTimeLimit] = useState<string>(selectedAssignment.timeLimit.slice(0, 5))
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [checked, setChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setTimeLimit(event.target.value)
  }

  const onChangeDueDateSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }

  const handleAdd = async () => {
    const timeLimitFormatted = timeLimit + ':00.000'
    setSubmitting(true)
    if(checked) {
      await RestAPI.assignment.creatTextAssignmentCourse(courseModel.id, selectedAssignment.id, timeLimitFormatted, dueDate.toISOString())
    } else {
      await RestAPI.assignment.creatTextAssignmentCourse(courseModel.id, selectedAssignment.id, timeLimitFormatted)
    }
    await refreshCourseModel()
    setDisplayMode('list')
    setSubmitting(false)
  }

  return (
    <Box>    
      <Loading submitting={submitting}/>
      <Typography variant='h4'>Kursaufgabe hinzufügen</Typography>
      <Divider/>

      <KeyValueComponent sx={{paddingTop: 2}} header='Kursinfo' keyValues={[
        {key: 'Name', component: <Typography variant='body1'>{courseModel.name}</Typography>},
        {key: 'Niveau', component: <Typography variant='body1'>{courseModel.level}</Typography>},
        {key: 'Ersteller', component: <Typography variant='body1'>{courseModel.ownerName}</Typography>},
        {key: 'Teilnehmerzahl', component: <Typography variant='body1'>{courseModel.users.items.length}</Typography>}
      ]}/>
      <KeyValueComponent sx={{paddingTop: 2}} header='Aufgabeninfo' keyValues={[
        {key: 'Name', component: <Typography variant='body1'>{selectedAssignment.name}</Typography>},
        {key: 'Niveau', component: <Typography variant='body1'>{selectedAssignment.level}</Typography>},
        {key: 'Ersteller', component: <Typography variant='body1'>{selectedAssignment.owner.name}</Typography>},
        {key: 'Beschreibung', component: <Typography variant='body1'>{selectedAssignment.description}</Typography>},
        {key: 'Link', component: <Link variant='body1' href={selectedAssignment.link} target="_blank" rel="noreferrer">{selectedAssignment.link}</Link>},
        {key: 'Standart Zeitlimit (hh:mm)', component: <Typography variant='body1'>{selectedAssignment.timeLimit.slice(0, 5)}</Typography>},
      ]}/>
      <KeyValueComponent sx={{paddingTop: 2, paddingBottom: 2}} header='Aufgabenoptionen' keyValues={[
        {key: 'Zeitlimit (hh:mm)', component: <TimeLimit onChangeInputField={onChangeInputField} selectedAssignment={selectedAssignment}/>},
        {key: 'Fälligkeitsdatum', component: <DateLimit checked={checked} onChangeDueDateSwitch={onChangeDueDateSwitch} setDueDate={setDueDate}/>},
      ]}/>
      <Button variant='contained' onClick={handleAdd}>Hinzufügen</Button>
      <Button variant='outlined' onClick={() => setDisplayMode('addList')}>Abbrechen</Button>
    </Box>
  )
}

const CourseAssignmentsList = ({handleAddCourse, courseModel, refreshCourseModel}: {handleAddCourse: any, courseModel: CourseModel, refreshCourseModel: () => Promise<void>}) => {
  const [hasPermission] = useUserStore((state) => [state.hasPermission])
  const [submitting, setSubmitting] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deleteTextAssignmentCourseId, setDeleteTextAssignmentCourseId] = useState<string | null>(null)

  const [userAssignments, setUserAssignments] = useState<any[]>([])
  
  const [ userId ] = useUserStore(state => [state.userId]) 

  const getUserAssignments = async () => {
    const personalAssignments = courseModel?.textAssignments?.items.map((item: any) => {
      console.log(item)
      const userAssignment = item.textAssignmentUsers.items.find((textAssignmentUser: any) => textAssignmentUser.userId === userId)
      const {textAssignment, textAssignmentUsers, ...textAssignmentCourse} = item
      userAssignment['textAssignmentCourse'] = textAssignmentCourse
      userAssignment['textAssignmentCourse']['textAssignment'] = textAssignment
      return userAssignment

    })
    setUserAssignments(personalAssignments ?? [])


  }

  useEffect(() => {
    getUserAssignments()
  }, [])
  

  const handleOpenDeleteDialog = async (assignmentId: string) => {
    setOpenDeleteDialog(true)
    setDeleteTextAssignmentCourseId(assignmentId)
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
  }

  const handleConfirmDelete = async () => {    
    setSubmitting(true)
    await RestAPI.assignment.deleteTextAssignmentCourse(deleteTextAssignmentCourseId!)
    await refreshCourseModel()
    setSubmitting(false)
    setOpenDeleteDialog(false)
    setDeleteTextAssignmentCourseId(null)
  }

  const adminActionsFactory = (textAssignmentCourse: any): CardAction[] => {
    return [{
      name: 'Entfernen',
      variant: 'text',
      color: 'error',
      onClick: () => handleOpenDeleteDialog(textAssignmentCourse.id)
    }]
  }

  return(
    <Box>
      <ConfirmDialog 
        title='Kursaufgabe entfernen'
        dialogText='Sind Sie sicher, dass Sie diese Kursaufgabe entfernen möchten?'
        open={openDeleteDialog}
        confirmButtonText='Entfernen'
        permanentWarning={true}
        dialogStyle='error'
        submitting={submitting}
        handleCancel={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
      />
      <Box>
        {hasPermission(['superAdmin', 'admin']) && 
          <ButtonGroup sx={{paddingBottom: 2}}>
            <Button variant='contained' onClick={handleAddCourse}>Kursaufgabe hinzufügen</Button>
          </ButtonGroup>
        }        
      </Box>
      <Box>
        <Typography variant='h4'>Kursaufgaben</Typography>
      </Box>
      <Grid container spacing={1} paddingBottom={2} paddingTop={2}>
        {hasPermission(['superAdmin', 'admin']) ? 
          courseModel?.textAssignments?.items.map((assignment: any) => {
            console.log("ASSIGNTMENT", assignment)
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={assignment.id}>
                <CourseAssignmentCard 
                  courseAssingnment={assignment}
                  assignmentType='Textproduktion'  
                  actions={hasPermission(['superAdmin', 'admin']) ? adminActionsFactory(assignment) : []}
                />
              </Grid>
            )
          })
          :
          courseModel?.textAssignments?.items.map((assignment) => {
            const userAssignment = assignment?.textAssignmentUsers?.items.find((item) => item?.userId === userId)
            if(!userAssignment){
              return null
            }

            return(
            <Grid item xs={12} md={6} lg={4} xl={3} key={assignment!.id}>
              <UserAssignmentCard 
                data={{
                  type: 'Textproduktion',
                  courseName: courseModel!.name,
                  courseLevel: courseModel!.level,
                  description: assignment!.textAssignment.description,
                  name: assignment!.textAssignment.name,
                  level: assignment!.textAssignment.level,
                  ownerName: assignment!.textAssignment.owner.name,
                  submission: userAssignment!.submission,
                  timeLimit: assignment!.timeLimit,
                  dueDate: assignment!.dueDate,  
                }}
                actions={[{
                  name: 'Teilnehmen',
                  onClick: () => console.log('Teilnehmen'),
                  color: 'primary',
                  variant: 'contained'
                }]}
              />
            </Grid>
            )
          })        
        }
      </Grid>
    </Box>
  )
}

const AddCourseAssignmentList = ({handleBack, courseModel, setSelectedTextAssignment, setDisplayMode}: {handleBack: () => void, courseModel: CourseModel, setDisplayMode: (mode: DisplayMode) => void, setSelectedTextAssignment: (model: any) => void}) => {
  const [textAssignments, setTextAssignments] = React.useState<any[]>([])

  const router = useRouter()

  const getAssignments = async () => {
    const assignmentsAlreadyInCourse = courseModel?.textAssignments?.items.map((assignment: any) => {
      return { id: {eq: assignment.textAssignment.id} }
    })

    let filter
    if(assignmentsAlreadyInCourse?.length !== 0) {
      filter = {
        not: {
          or: assignmentsAlreadyInCourse
        }
      }
    }

    const assignments = await RestAPI.assignment.getTextAssignments(filter)
    setTextAssignments(assignments)
  }

  const handleNewAssignment = () => {
    router.push('/assignments')
  }

  const handleAddAssignment = async (assignment: any) => {
    setSelectedTextAssignment(assignment)
    setDisplayMode('add')
  }

  useEffect(() => {
    getAssignments()
  }, [])

  return(
    <Box>
      <Box>
        <ButtonGroup sx={{paddingBottom: 2}}>          
          <Button variant='outlined' onClick={handleBack}>
            <ArrowBackIcon/>
          </Button>
          <Button variant='contained' onClick={handleNewAssignment}>Neue Aufgabe</Button>
        </ButtonGroup>
      </Box>
      <Box>
        <Typography variant='h4'>Kursaufgabe hinzufügen</Typography>
      </Box>
      <Grid container spacing={1} paddingBottom={2} paddingTop={2}>  
        {textAssignments.map((assignment: any) => {
            return (
              <Grid item xs={12} md={6} lg={4} xl={3} key={assignment.id}>
                <AssignmentCard 
                  assignment={assignment}
                  assignmentType='Textproduktion'  
                  actions={[
                    {
                      name: 'Hinzufügen',
                      onClick: () => handleAddAssignment(assignment),
                      color: 'primary',
                      variant: 'text'
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

const DisplayModeSwitch = ({displayMode, courseModel, setDisplayMode, refreshCourseModel} : {displayMode: DisplayMode, courseModel: CourseModel, setDisplayMode: (displayMode: DisplayMode) => void, refreshCourseModel: () => Promise<void>}) => {
  const [selectedTextAssignment, setSelectedTextAssignment] = React.useState<any>(null)

  switch(displayMode) {
    case 'list':
      return <CourseAssignmentsList refreshCourseModel={refreshCourseModel} courseModel={courseModel} handleAddCourse={() => setDisplayMode('addList')}/>
    case 'addList':
      return <AddCourseAssignmentList handleBack={() => setDisplayMode('list')} setSelectedTextAssignment={setSelectedTextAssignment} courseModel={courseModel} setDisplayMode={setDisplayMode}/>
    case 'add':
      return <AddCourseTextAssignment refreshCourseModel={refreshCourseModel} courseModel={courseModel} selectedAssignment={selectedTextAssignment} setDisplayMode={setDisplayMode}/>  
    default:
      return <>ERROR: UNKNOWN STATE</>
  }
}

function CourseAssignments({courseModel, refreshCourseModel}: {courseModel: CourseModel, refreshCourseModel: () => Promise<void>}) {
  const [displayMode, setDisplayMode] = React.useState<DisplayMode>('list')

  return (
    <Box>
      <DisplayModeSwitch refreshCourseModel={refreshCourseModel} displayMode={displayMode} courseModel={courseModel} setDisplayMode={setDisplayMode}/>
    </Box>
  )
}

export default CourseAssignments