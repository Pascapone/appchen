import React from 'react'
import { Card, CardActions, CardContent, CardHeader, Typography, Button, Link } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article';
import { useTheme } from '@mui/material'
import { AssignmentDialogInputs } from './AssignmentDialog'

interface AssignmentCardProps {
  assignment: any,  
  assignmentType: string
  actions: Array<CardAction>
}

export interface CardAction {
  name: string,
  onClick: () => void,
  color: string,
  variant: "contained" | "outlined" | "text"
}

export default function AssignmentCard({assignment, assignmentType, actions}: AssignmentCardProps) {

  const theme = useTheme()

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


