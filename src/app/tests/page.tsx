"use client"
import React, { useEffect } from 'react'
import { graphQlQuery } from '@/restapi/utils'
import { getTextAssignmentCourse } from '@/graphql/queries'

import { useOpenUserRevisionStore } from '@/store/routeStore'

function Tests() {

  const [ setRouteParams, consumeRouteParams, consumeable ] = useOpenUserRevisionStore(state => [state.setRouteParams, state.consumeRouteParams, state.consumeable])

  console.log(consumeable)

  
  
  useEffect(() => {    
    console.log("Effect active", consumeable)
    
    console.log("Consume Get PARAMS")
    console.log(consumeRouteParams())
    // setRouteParams(false, '', '')
  }, [consumeable])

  useEffect(() => {
    console.log("Set PARAMS")
    setRouteParams('userId', 'courseId')
  }, [])

  


  return (
    <div>
    </div>
  )
}

export default Tests