import React, {useEffect} from 'react'
import { Box, Button, Typography, Grid, ButtonGroup } from '@mui/material'
import AppToolbar from './Toolbar'
import AssignmentCard from '@/app/assignments/components/AssignmentCard'
import { RestAPI } from '@/restapi/RestAPI'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type DisplayMode = 'list' | 'add' | 'edit'

const CourseAssignmentsList = ({handleAddCourse}: {handleAddCourse: any}) => {

  return(
    <Box>
      <Box>
        <ButtonGroup>
          <Button variant='contained' onClick={handleAddCourse}>Neue Kursaufgabe</Button>
        </ButtonGroup>
      </Box>
      <Typography variant='h4' sx={{paddingTop: 2}}>Kursaufgaben</Typography>
    </Box>
  )
}

const AddCourseAssignment = ({handleBack}: {handleBack: () => void}) => {
  const [textAssignments, setTextAssignments] = React.useState<any[]>([])

  const getAssignments = async () => {
    const assignments = await RestAPI.assignment.getTextAssignments()
    setTextAssignments(assignments)
    console.log(assignments)
  }

  useEffect(() => {
    getAssignments()
  }, [])

  return(
    <Box>
      <Box>
        <ButtonGroup>          
          <Button variant='outlined' onClick={handleBack}>
            <ArrowBackIcon/>
          </Button>
        </ButtonGroup>
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
                      onClick: () => {},
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

const DisplayModeSwitch = ({displayMode, setDisplayMode} : {displayMode: DisplayMode, setDisplayMode: (displayMode: DisplayMode) => void}) => {
  switch(displayMode) {
    case 'list':
      return <CourseAssignmentsList handleAddCourse={() => setDisplayMode('add')}/>
    case 'add':
      return <AddCourseAssignment handleBack={() => setDisplayMode('list')}/>
    default:
      return <CourseAssignmentsList handleAddCourse={() => setDisplayMode('add')}/>
  }
}

function CourseAssignments() {
  const [displayMode, setDisplayMode] = React.useState<DisplayMode>('list')

  const handleAddAssignment = () => {
    console.log('add assignment')
    setDisplayMode('add')
  }

  return (
    <Box>
      <DisplayModeSwitch displayMode={displayMode} setDisplayMode={setDisplayMode}/>
    </Box>
  )
}

export default CourseAssignments