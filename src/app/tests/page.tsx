"use client"
import React from 'react'
import { graphQlQuery } from '@/restapi/utils'
import { getTextAssignmentCourse } from '@/graphql/queries'

function Test() {

  const getCourseAssignment = async () => {
    const response = await graphQlQuery(getTextAssignmentCourse, { id: 'ed9d6da0-0899-48ab-b9af-aaabe5139374' })
    console.log(response)
  }

  return (
    <div>
      <h1>Test</h1>
      <button onClick={getCourseAssignment}>Get Course Assignment</button>
    </div>
  )
}

export default Test