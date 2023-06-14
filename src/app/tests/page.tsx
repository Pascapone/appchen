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
      <iframe src="http://docs.google.com/gview?url=https://drive.google.com/uc?id=1ePh-ocUWPKvPdKvXKx2-mGsGa9nf5Fmn&embedded=true" style={{width: '100%', height: '700px'}}></iframe>
    </div>
  )
}

export default Test