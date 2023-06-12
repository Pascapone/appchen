import React from 'react'
import { Card, CardActions, CardContent, CardHeader, Typography, Button, Link } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article';
import { useTheme } from '@mui/material'
import { dateToGermanString } from '@/utils/dateUtils';

interface AssignmentCardProps {
  courseAssingnment: any,  
  assignmentType: string
  actions: Array<CardAction>
}

export interface CardAction {
  name: string,
  onClick: () => void,
  color: string,
  variant: "contained" | "outlined" | "text"
}

export default function CourseAssignmentCard({courseAssingnment, assignmentType, actions}: AssignmentCardProps) {
  const assignment = courseAssingnment.textAssignment
  const theme = useTheme()

  console.log(courseAssingnment)

  const openInNewTab = () => {
    window.open(assignment.link, "_blank", "noreferrer");
  };

  return (
    <Card sx={{height: "100%"}}>
      <CardHeader   
        title={`${assignment.name} - ${assignment.level}`}
        subheader={assignmentType}
      />
      <CardContent>
        <Typography variant="body2">
          Aufgabenersteller:
        </Typography>
        <Typography variant="body2" color={theme.palette.info.main}>
          {assignment.owner.name}
        </Typography>
        <Typography paddingTop={2} variant="body1">
          Beschreibung:
        </Typography>
        <Typography variant="body2" paddingBottom={2}>
          {assignment.description}
        </Typography>
        <Typography paddingBottom={2} variant="body1">
          Zeitlimit: {courseAssingnment.timeLimit.slice(0, 5)} (hh:mm)
        </Typography>
        <Typography variant="body1">
          Fälligkeitsdatum:
        </Typography>
        <Typography paddingBottom={2} variant="body1">
          {courseAssingnment.dueDate ? dateToGermanString(new Date(courseAssingnment.dueDate)) : "Kein Fälligkeitsdatum"}
        </Typography>
        <Button onClick={openInNewTab} startIcon={<ArticleIcon />}>
          Datei
        </Button>
      </CardContent>   
      <CardActions>        
        {actions.map((action: any) => {
          return (
            <Button key={action.name} onClick={action.onClick} size="small" color={action.color} variant={action.variant}>{action.name}</Button>
          )
        })}
      </CardActions>                       
    </Card>
  )
}


