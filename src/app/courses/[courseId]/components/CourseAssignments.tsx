import React, {useEffect, useState} from 'react'
import { Box, Button, Typography, Grid, ButtonGroup, Divider, Link, TextField, Switch, FormControlLabel, ToggleButton, ToggleButtonGroup } from '@mui/material'
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

import parse from 'html-react-parser';
import { useTheme } from '@mui/material';

import { OpenUserRevisionState } from '@/store/routeStore'

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { useOpenUserRevisionStore } from '@/store/routeStore'

type CourseModel = GetCourseWithUsersQuery['getCourse']

const { RangePicker } = DatePicker;

type DisplayMode = 'courseAssignmentList' | 'addCourseAssignmentList' | 'edit' | 'addCourseAssignment' | 'userAssignmentList' | 'reviseUserAssignment' | 'userRevision'


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
    setDisplayMode('courseAssignmentList')
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
      <Button variant='outlined' onClick={() => setDisplayMode('addCourseAssignmentList')}>Abbrechen</Button>
    </Box>
  )
}

const CourseAssignmentsList = ({handleAddCourse, courseModel, refreshCourseModel, handleOpenCourseAssignment, handleOpenUserRevision}: {handleAddCourse: any, courseModel: CourseModel, refreshCourseModel: () => Promise<void>, handleOpenCourseAssignment: (textAssignmentCourseId: string) => void, handleOpenUserRevision: (courseAssignmentId: string, userAssignmentId: string) => void}) => {
  const [hasPermission] = useUserStore((state) => [state.hasPermission])
  const [submitting, setSubmitting] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deleteTextAssignmentCourseId, setDeleteTextAssignmentCourseId] = useState<string | null>(null)

  const [openApplyDialog, setOpenApplyDialog] = useState(false)
  const [applyUserAssignmentId, setApplyUserAssignmentId] = useState('')

  const [userAssignments, setUserAssignments] = useState<any[]>([])
  
  const [ userId ] = useUserStore(state => [state.userId]) 

  const router = useRouter()

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

  const adminActionsFactory = (textAssignmentCourse: any, handleOpenCourseAssignment: (textAssignmentCourseId: string) => void): CardAction[] => {
    return [
      {
        name: 'Ansehen',
        variant: 'text',
        color: 'primary',
        onClick: () => handleOpenCourseAssignment(textAssignmentCourse.id)
      },
      {
        name: 'Entfernen',
        variant: 'text',
        color: 'error',
        onClick: () => handleOpenDeleteDialog(textAssignmentCourse.id)
      },
    ]
  }

  const handleApplyAssignment = (assignmentId: string) => {
    setApplyUserAssignmentId(assignmentId)
    setOpenApplyDialog(true)
  }

  const confirmApplyAssignment = () => {   
    setSubmitting(true) 
    router.push(`/assignment/${applyUserAssignmentId}`)
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
                  actions={adminActionsFactory(assignment, handleOpenCourseAssignment)}
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
                  userAssignmentId: userAssignment!.id,
                  revision: userAssignment!.revision,
                }}
                actions={[{
                  name: 'Teilnehmen',
                  onClick: () => handleApplyAssignment(userAssignment!.id),
                  color: 'primary',
                  variant: 'contained',
                  hide: userAssignment!.submission !== null
                },
                {
                  name: 'Korrektur',
                  onClick: () => handleOpenUserRevision(assignment!.id, userAssignment!.id),
                  color: 'primary',
                  variant: 'contained',
                  hide: userAssignment!.revision === null
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
    setDisplayMode('addCourseAssignment')
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

import DisplayEditor from './DisplayEditor'

const ReviseUserAssignment = ({openedUserAssignmentId, openedCourseAssignmentId, handleBack, courseModel}: {openedUserAssignmentId: string | null, openedCourseAssignmentId: string | null, handleBack: () => void, courseModel: CourseModel}) => {
  const [submitting, setSubmitting] = React.useState(false)
  const [revision, setRevision] = React.useState<string>('')

  const theme = useTheme()


  const userAssignment = courseModel?.textAssignments?.items.find(item => item?.id === openedCourseAssignmentId)?.textAssignmentUsers?.items.find(item => item?.id === openedUserAssignmentId)
  console.log("USERASSIGNMENT", userAssignment)

  const onChangeSubmissionHTML = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRevision(event.target.value)
  }

  const handleSubmitRevision = async () => {
    setSubmitting(true)
    console.log("SUBMITTING", openedUserAssignmentId, revision)
    await RestAPI.assignment.submitUserAssignmentRevision(openedUserAssignmentId!, revision)
    setSubmitting(false)
  }

  const copyHTMLStringToClipboard = () => {
    navigator.clipboard.writeText(userAssignment!.revision!)
  }

  return (
    <>     
      <Loading submitting={submitting}/>
      <Box>
        <ButtonGroup sx={{paddingBottom: 2}}>          
          <Button variant='outlined' onClick={handleBack}>
            <ArrowBackIcon/>
          </Button>
        </ButtonGroup>
      </Box>
      {
        userAssignment?.submission &&
        <>
          <Typography variant='h6'>Abgabe</Typography>
          <DisplayEditor htmlSubmission={userAssignment!.submission!} height={400}/>  

          { userAssignment?.revision &&
            <>
              <Typography variant='h6'>Korrektur</Typography>
              <Box border={`1px solid ${theme.palette.divider}`} sx={{height: 400, overflow: 'auto'}}>
                <Box sx={{margin: 2}}>
                  {parse(userAssignment!.revision!)}   
                </Box> 
              </Box>
              <Button startIcon={<ContentCopyIcon/>} variant='contained' color='primary' onClick={copyHTMLStringToClipboard}>HTML String in die Zwischenablage</Button>
            </>
          }
          <Box sx={{paddingTop: 2}}>
            <TextField 
              margin='dense'
              label='Korrektur HTML'
              required
              onChange={onChangeSubmissionHTML}   
              fullWidth           
            />
            <Button variant='contained' color='primary' onClick={handleSubmitRevision}>Abschicken</Button>
          </Box>
        </>
      }
    </>
  )
}

const CourseAssignmentUserList = ({openedCourseAssignmentId, courseModel, handleBack, handleReviseUserAssignment} : {openedCourseAssignmentId: string | null, courseModel: CourseModel, handleBack: () => void, handleReviseUserAssignment: (userAssignmentId: string) => void}) => {
  const [filters, setFilters] = React.useState<Filter[]>(() => ['open', 'revisioned'])
  const [openResetAssignmentDialog, setOpenResetAssignmentDialog] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [resetAssignmentId, setResetAssignmentId] = React.useState<string | null>(null)
  const courseAssignment = courseModel?.textAssignments?.items.find((item) => item?.id === openedCourseAssignmentId)

  type Filter = 'open' | 'revisioned'

  const handleChangeFilters = (event: React.MouseEvent<HTMLElement>, newFilters: string[],) => {   
    setFilters(newFilters as Filter[])
  }

  const handleResetAssignment = (userAssignmentId: string) => {
    console.log("Reset", userAssignmentId)
    setResetAssignmentId(userAssignmentId)
    setOpenResetAssignmentDialog(true)
  }

  const submitResetAssignment = async () => {
    setSubmitting(true)
    await RestAPI.assignment.resetUserAssignmentTime(resetAssignmentId!)
    setSubmitting(false)
    setOpenResetAssignmentDialog(false)
  }

  return(
    <>
      <ConfirmDialog
        title='Aufgabe zurücksetzen'
        handleConfirm={submitResetAssignment}
        dialogText='Sind Sie sicher, dass Sie die Aufgabe zurücksetzen wollen? Alle Korrekturen und Abgaben werden gelöscht. Sollte nur gemacht werden wenn es ein Problem mit der Aufgabe gibt.'
        handleCancel={() => setOpenResetAssignmentDialog(false)}
        open={openResetAssignmentDialog}
        submitting={submitting}
        confirmButtonText='Zurücksetzen'
        dialogStyle='error'
        permanentWarning={true}
      />
      <Box>
        <ButtonGroup sx={{paddingBottom: 2}}>          
          <Button variant='outlined' onClick={handleBack}>
            <ArrowBackIcon/>
          </Button>
          <ToggleButtonGroup value={filters} onChange={handleChangeFilters}>
            <ToggleButton value='open'>Offen</ToggleButton>
            <ToggleButton value='revisioned'>Korrigiert</ToggleButton>
          </ToggleButtonGroup>
        </ButtonGroup>
      </Box>
      <Grid container spacing={1} paddingBottom={2} paddingTop={2}>
        {courseAssignment?.textAssignmentUsers?.items.map((item) => {
          if(!filters.includes('open') && item?.submission === null) return null
          if(!filters.includes('revisioned') && item?.revision !== null) return null
          
          return(
            <Grid item xs={12} md={6} lg={4} xl={3} key={item!.id}>
              <UserAssignmentCard
                data={{
                  name: courseAssignment!.textAssignment.name,
                  description: courseAssignment!.textAssignment.description,
                  level: courseAssignment!.textAssignment.level,
                  ownerName: courseAssignment!.textAssignment.owner.name,
                  timeLimit: courseAssignment!.timeLimit,
                  dueDate: courseAssignment!.dueDate,
                  courseName: courseModel!.name,
                  courseLevel: courseModel!.level,
                  submission: item?.submission,
                  revision: item?.revision,
                  userAssignmentId: item!.id,
                  type: 'Textproduktion'
                }}
                actions={[
                  {
                    name: 'Korrigieren',
                    variant: 'contained',
                    color: 'primary',
                    onClick: () => handleReviseUserAssignment(item!.id),
                    hide: item!.submission === null || item!.revision !== null
                  },
                  {
                    name: 'Überarbeiten',
                    variant: 'contained',
                    color: 'primary',
                    onClick: () => handleReviseUserAssignment(item!.id),
                    hide: item!.submission === null || item!.revision === null
                  },
                  {
                    name: 'Reset',
                    variant: 'contained',
                    color: 'error',
                    onClick: () => handleResetAssignment(item!.id),
                    hide: item!.submission === null || item!.revision !== null
                  }
                ]}
              />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

const UserRevision = ({ openedCourseAssignmentId, openedUserAssignmentId, courseModel, handleBack } : {openedCourseAssignmentId: string | null, openedUserAssignmentId: string | null, courseModel: CourseModel, handleBack: () => void}) => {
  
  const [userAssignment, setUserAssignment] = React.useState<any>(null)
  
  useEffect(() => {
    if(courseModel && openedCourseAssignmentId && openedUserAssignmentId) {
      console.log("IDS", openedCourseAssignmentId, openedUserAssignmentId)
      console.log("Kurs Model ----", courseModel)
      const assignment = courseModel?.textAssignments?.items.find(item => item?.id === openedCourseAssignmentId)?.textAssignmentUsers?.items.find(item => item?.id === openedUserAssignmentId)
      console.log("USERASSIGNMENT", assignment)
      console.log("REVISION", assignment!.revision!)
      setUserAssignment(assignment)
    }

  }, [openedCourseAssignmentId, openedUserAssignmentId, courseModel])
  
  
  const theme = useTheme()
  
  return(
    <>
      <Box>
        <ButtonGroup sx={{paddingBottom: 2}}>          
          <Button variant='outlined' onClick={handleBack}>
            <ArrowBackIcon/>
          </Button>
        </ButtonGroup>
      </Box>
      {
        userAssignment?.submission &&
        <>
          <Typography variant='h6'>Abgabe</Typography>
          <DisplayEditor htmlSubmission={userAssignment!.submission!} height={400}/>  
          <Typography variant='h6'>Korrektur</Typography>
          <Box border={`1px solid ${theme.palette.divider}`} sx={{height: 400, overflow: 'auto'}}>
            <Box sx={{margin: 2}}>
              {parse(userAssignment!.revision!)}   
            </Box> 
          </Box>
        </>
      }
    </>
  )
}

const DisplayModeSwitch = ({displayMode, courseModel, setDisplayMode, refreshCourseModel} : {displayMode: DisplayMode, courseModel: CourseModel, setDisplayMode: (displayMode: DisplayMode) => void, refreshCourseModel: () => Promise<void>}) => {
  const [selectedAddTextAssignment, setSelectedAddTextAssignment] = React.useState<any>(null)
  const [openedCourseAssignmentId, setOpenedCourseAssignmentId] = React.useState<string | null>(null)
  const [openedUserAssignmentId, setOpenedUserAssignmentId] = React.useState<string | null>(null)

  const [ consumeable, consumeRouteParams ] = useOpenUserRevisionStore(state => [state.consumeable, state.consumeRouteParams])

  useEffect(() => {
    console.log("Open User Revision", consumeable)
    if(!consumeable) return
    const params = consumeRouteParams()
    if(!params) return
    setOpenedCourseAssignmentId(params.courseAssignmentId)
    setOpenedUserAssignmentId(params.userAssignmentId)
    setDisplayMode('userRevision')
  }, [consumeable])

  const handleOpenCourseAssignment = (textAssignmentCourseId: string) => {
    setOpenedCourseAssignmentId(textAssignmentCourseId)
    setDisplayMode('userAssignmentList')
  }

  const handleReviseUserAssignment = (userAssignmentId: string) => {
    setOpenedUserAssignmentId(userAssignmentId)
    setDisplayMode('reviseUserAssignment')
  }

  const handleOpenUserRevision = (courseAssignmentId: string, userAssignmentId: string) => {
    setOpenedUserAssignmentId(userAssignmentId)
    setOpenedCourseAssignmentId(courseAssignmentId)
    setDisplayMode('userRevision')
  }

  switch(displayMode) {
    case 'courseAssignmentList':
      return <CourseAssignmentsList handleOpenUserRevision={handleOpenUserRevision} refreshCourseModel={refreshCourseModel} courseModel={courseModel} handleAddCourse={() => setDisplayMode('addCourseAssignmentList')} handleOpenCourseAssignment={handleOpenCourseAssignment}/>
    case 'addCourseAssignmentList':
      return <AddCourseAssignmentList handleBack={() => setDisplayMode('courseAssignmentList')} setSelectedTextAssignment={setSelectedAddTextAssignment} courseModel={courseModel} setDisplayMode={setDisplayMode}/>
    case 'addCourseAssignment':
      return <AddCourseTextAssignment refreshCourseModel={refreshCourseModel} courseModel={courseModel} selectedAssignment={selectedAddTextAssignment} setDisplayMode={setDisplayMode}/>  
    case 'userAssignmentList':
      return <CourseAssignmentUserList openedCourseAssignmentId={openedCourseAssignmentId} courseModel={courseModel} handleBack={() => setDisplayMode('courseAssignmentList')} handleReviseUserAssignment={handleReviseUserAssignment}/>
    case 'reviseUserAssignment':
      return <ReviseUserAssignment openedCourseAssignmentId={openedCourseAssignmentId} courseModel={courseModel} openedUserAssignmentId={openedUserAssignmentId} handleBack={() => setDisplayMode('userAssignmentList')}/>
    case 'userRevision':
      return <UserRevision openedCourseAssignmentId={openedCourseAssignmentId} openedUserAssignmentId={openedUserAssignmentId} courseModel={courseModel} handleBack={() => setDisplayMode('courseAssignmentList')}/>
    default:
      return <>ERROR: UNKNOWN STATE</>
  }
}

function CourseAssignments({courseModel, refreshCourseModel}: {courseModel: CourseModel, refreshCourseModel: () => Promise<void>}) {
  const [displayMode, setDisplayMode] = React.useState<DisplayMode>('courseAssignmentList')

  return (
    <Box>
      <DisplayModeSwitch refreshCourseModel={refreshCourseModel} displayMode={displayMode} courseModel={courseModel} setDisplayMode={setDisplayMode}/>
    </Box>
  )
}

export default CourseAssignments