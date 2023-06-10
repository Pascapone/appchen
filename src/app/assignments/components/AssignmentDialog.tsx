import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Dropdown from '@/components/inputs/Dropdown';

import { level } from '@/constants/courseData';
import { Level } from '@/GraphQL'
import { SelectChangeEvent } from '@mui/material/Select'

import { toast } from 'react-toastify';

export interface AssignmentDialogInputs {
  id: string,
  name: string,
  level: Level,
  description: string,
  link: string,
  timeLimit: string
}

interface DialogProps {
  open: boolean,
  submitting: boolean,
  handleCancel: () => void,
  handleConfirm: (name: string, level: Level, description: string, link: string, timeLimit: string, assignmentId?: string) => void,
  currentValues: AssignmentDialogInputs | null,
}

type InputErrors = {
  name: boolean,
  description: boolean,
  level: boolean,
  link: boolean,
  timeLimit: boolean
}

export default function AssignmentDialog({
  open, 
  submitting, 
  handleCancel, 
  handleConfirm,
  currentValues
} : DialogProps) {  

  const notifyInputError = () => toast.error("Nicht alle Pflichtfelder sind ausgefüllt!", {
    theme: "colored",
  });

  const [courseLevel, setCourseLevel] = useState<Level | null>(currentValues === null ? null: currentValues.level)
  const [name, setName] = useState<string>(currentValues === null ? "" : currentValues.name)
  const [description, setDescription] = useState<string>(currentValues === null ? "" : currentValues.description)
  const [link, setLink] = useState<string>(currentValues === null ? "" : currentValues.link)
  const [timeLimit, setTimeLimit] = useState<string>(currentValues === null ? "" : currentValues.timeLimit)

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    name: false,
    description: false,
    level: false,
    link: false,
    timeLimit: false
  })

  const onChangeDropDown = (event: SelectChangeEvent) => {
    setCourseLevel(event.target.value as Level)
  }

  const onChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case "name":
        setName(event.target.value)
        break;
      case "description":
        setDescription(event.target.value)
        break;
      case "link":
        const value = event.target.value.slice(0, 8) === "https://" ? event.target.value : "https://" + event.target.value
        console.log(value)
        setLink(value)
        break;
      case "timeLimit":
        setTimeLimit(event.target.value + ":00.000")
        break;
      default:
        break;
    }
  }

  const handleSubmitCreateCourseDialog = async () => {   

    const newInputErrors: InputErrors = {
      name: name === "",
      description: description === "",
      level: courseLevel === null,
      link: link === "",
      timeLimit: timeLimit === ""
    }

    setInputErrors(newInputErrors)

    if(Object.values(newInputErrors).some(error => error)) {
      notifyInputError()
      return
    }

    handleConfirm(name, courseLevel!, description, link, timeLimit, currentValues === null ? undefined : currentValues.id)    
  }

  useEffect(() => {    
    setCourseLevel(currentValues === null ? null : currentValues.level)
    setName(currentValues === null ? "" : currentValues.name)
    setDescription(currentValues === null ? "" : currentValues.description)
    setLink(currentValues === null ? "" : currentValues.link)
    setTimeLimit(currentValues === null ? "" : currentValues.timeLimit)
    return () => {      
    }
  }, [currentValues])
  

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          Aufgabe Erstellen
        </DialogTitle>        
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={submitting}         
        >
          <CircularProgress />        
        </Backdrop>         
        <Box>
          <DialogContent>          
            <TextField
              autoFocus
              required
              error={inputErrors.name}
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeInputField}
              defaultValue={currentValues === null ? "" : currentValues.name}
            />
            <TextField
              required
              error={inputErrors.description}
              margin="dense"
              id="description"
              label="Beschreibung"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeInputField}
              multiline
              defaultValue={currentValues === null ? "" : currentValues.description}
            />
            <TextField
              required
              error={inputErrors.link}
              margin="dense"
              id="link"
              label="Link"
              type="text"
              fullWidth
              variant="standard"
              onChange={onChangeInputField}
              defaultValue={currentValues === null ? "" : currentValues.link}
            />
            <TextField
              required
              error={inputErrors.timeLimit}
              margin="dense"
              id="timeLimit"
              label="Zeitlimit (hh:mm)"
              type="time"
              fullWidth
              variant="standard"
              onChange={onChangeInputField}
              defaultValue={currentValues === null ? '00:00' : currentValues.timeLimit.slice(0, 5)}
              sx={{paddingBottom: 2}}
            />
            <Dropdown name='Kursstufe' options={level} onChange={onChangeDropDown} error={inputErrors.level} defaultValue={currentValues === null ? '' : currentValues.level}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Abbrechen</Button>
            <Button color='success'variant='contained' onClick={handleSubmitCreateCourseDialog}>{currentValues === null ? "Erstellen" : "Aktualisieren"}</Button>
          </DialogActions>
        </Box>   
      </Dialog>
    </div>
  );
}