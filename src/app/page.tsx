"use client"

import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'

const Home = ({signOut, user}: WithAuthenticatorProps) => {  


  return (
    <div>      
      Home
    </div>
  )
}
export default withAuthenticator(Home);