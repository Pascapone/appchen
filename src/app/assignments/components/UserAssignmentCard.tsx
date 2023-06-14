"use client"
import React from 'react'
import { Card, CardActions, CardContent, CardHeader, Typography, Button, Link, Divider, Theme } from '@mui/material'
import { useTheme } from '@mui/material'
import KeyValueList from '@/components/display/KeyValueList'; 
import { dateToGermanString } from '@/utils/dateUtils';
import { GetCourseWithUsersQuery } from '@/GraphQL'

interface AssignmentCardProps {
  data: AssignmentData,
  actions: Array<CardAction>
}

export interface AssignmentData {
  type: string,
  name: string,
  level: string,
  description: string,
  ownerName: string,
  timeLimit: string  | null | undefined,
  courseName: string,
  courseLevel: string,
  userAssignmentId: string,
  dueDate: string  | null | undefined,
  submission: string | null | undefined
  revision: string | null | undefined
}

export interface CardAction {
  name: string,
  onClick: () => void,
  color: string,
  variant: "contained" | "outlined" | "text",
  hide?: boolean
}

type AssignmentStatus = "open" | "submitted" | "revisioned"

interface AssignmentStatusProps {
  color: string,
  text: string
  status: AssignmentStatus
}

const getAssignmentStatus = (submission: any, revision: any, theme: Theme ) : AssignmentStatusProps => {
  if (submission === null) return {text: "Offen", color: theme.palette.error.main, status: "open"}
  if (revision === null) return {text: "Abgegeben", color: theme.palette.success.main, status: "submitted"}
  return {text: "Korrigiert", color: theme.palette.warning.main, status: "revisioned"}
}

export default function UserAssignmentCard({data, actions}: AssignmentCardProps) { 
  console.log("User Assignment Card:", data)
  const theme = useTheme()

  const assignmentOpen = data.submission === null

  return (
    <Card sx={{height: "100%"}}>
      <CardHeader   
        title={`${data.name} - ${data.level}`}
        subheader={data.type}
      />
      <CardContent>
        <KeyValueList items={[
          {key: 'Beschreibung:', component: <Typography variant="body1" color={theme.palette.info.main}>{data.description}</Typography>},
          {key: 'Zeitlimit:', component: <Typography variant="body1" color={theme.palette.info.main}>{data.timeLimit?.slice(0,5)} h</Typography>},
          {key: 'Kursname:', component: <Typography variant="body1" color={theme.palette.info.main}>{data.courseName}</Typography>},
          {key: 'Kursniveau:', component: <Typography variant="body1" color={theme.palette.info.main}>{data.courseLevel}</Typography>},
          {key: 'Aufgabenersteller', component: <Typography variant="body1" color={theme.palette.info.main}>{data.ownerName}</Typography>},
          {key: 'Fälligkeitsdatum', component: <Typography variant="body1" color={theme.palette.info.main}>{data.dueDate ? dateToGermanString(new Date(data.dueDate)) : 'Kein Limit'}</Typography>},
          {key: 'Status', component: <Typography variant="body1" fontWeight={700} color={getAssignmentStatus(data.submission, data.revision, theme).color}>{getAssignmentStatus(data.submission, data.revision, theme).text}</Typography>},
          ]}
        />
      </CardContent>        
      <CardActions>        
        {actions.map((action: any) => {
          if(action.hide) return null
          return (
            <Button key={action.name} onClick={action.onClick} size="small" color={action.color} variant={action.variant}>{action.name}</Button>
          )
        })}
      </CardActions>          
    </Card>
  )
}


