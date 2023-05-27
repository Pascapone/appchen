"use client"
import React from 'react'
import { RestAPI } from '@/restapi/RestAPI'
import { useState } from 'react'
import { Level } from '@/GraphQL'
import { useRouter } from 'next/navigation'

import { SelectChangeEvent } from '@mui/material/Select'
import { Box, Typography, Button, CircularProgress, Backdrop, TextField } from '@mui/material';

import DateRange from '@/components/inputs/DateRange';
import { level } from '@/constants/courseData';
import Dropdown from '@/components/inputs/Dropdown';

import { ToastContainer, toast } from 'react-toastify';

type InputErrors = {
  courseName: boolean,
  date: boolean,
  level: boolean
}

function CreateCourse() {
  const [ submitting, setSubmitting ] = useState(false)
  const [ courseLevel, setCourseLevel ] = React.useState<Level | null>(null)
  const [ courseName, setCourseName ] = React.useState<string>('')

  const [ courseNameError, setCourseNameError ] = React.useState<boolean>(false)
  const [ dateError, setDateError ] = React.useState<boolean>(false)
  const [ levelError, setLevelError ] = React.useState<boolean>(false)

  const [ startDate, setStartDate ] = React.useState<Date | null>(null)
  const [ endDate, setEndDate ] = React.useState<Date | null>(null)

  const [ openDateRange, setOpenDateRange ] = React.useState<boolean>(false)

  const inputError = () => toast.error("Nicht alle Pflichtfelder sind ausgefüllt!", {
    theme: "colored",
  });

  const router = useRouter()

  const onChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "Kursname":
        setCourseName(event.target.value)
        break;
    
      default:
        break;
    }
  }

  const onChangeDropDown = (event: SelectChangeEvent) => {
    switch (event.target.name) {
      case "Kursniveau":
        setCourseLevel(event.target.value as Level)
        break;
    
      default:
        break;
    }
  }

  const handleCancel = () => {
    router.back()
  }

  const handleSubmitCreateCourseDialog = async () => {   

    const inputErrors: InputErrors = {
      courseName: courseName === '',
      date: startDate === null || endDate === null,
      level: courseLevel === null
    }

    setCourseNameError(inputErrors.courseName)
    setDateError(inputErrors.date)
    setLevelError(inputErrors.level)    

    if(Object.values(inputErrors).some(error => error)) {
      inputError()
      return
    }

    setSubmitting(true)   

    // Implement Error Handling
    await RestAPI.course.createJoinCourse(courseName, courseLevel!, startDate!, endDate!).catch(err => {
      console.log(err)      
    })

    setCourseName('')
    setCourseLevel(null)
    setStartDate(null)
    setEndDate(null)    
    setSubmitting(false)

    router.push('/courses')
  }

  const onOpenChangeDateRange = (open: boolean) => {
    setOpenDateRange(open)
  }

  return (
    <div>      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={submitting}
        title='Kurs wird erstellt...'            
      >
        <CircularProgress />        
      </Backdrop> 
      <Box padding={2}>
        <Typography variant="h4">Kurs erstellen</Typography>
      </Box>
      <Box padding={2} paddingTop={0}> 
        <TextField
          autoFocus
          required
          error={courseNameError}
          margin="dense"
          id="Kursname"
          label="Kursname"
          type="text"
          fullWidth
          variant="standard"
          onChange={onChangeInputField}
        />
      </Box>
      <Box padding={2}>
        <Dropdown error={levelError} name="Kursniveau" options={level} onChange={onChangeDropDown}/>
      </Box>
      <Box padding={2}>
        <DateRange onOpenChange={onOpenChangeDateRange} error={dateError} setStartDate={setStartDate} setEndDate={setEndDate}/>
      </Box>
      <Box padding={2}>
        <Button onClick={handleCancel}>Abbrechen</Button>
        <Button onClick={() => handleSubmitCreateCourseDialog()}>Erstellen</Button>
      </Box>
      {openDateRange &&
        <Box sx={{display: {xs: "block", "sm": "none"}}} style={{height: 600}}/>
      }
      
    </div>
  )
}

export default CreateCourse