"use client"

import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'

 const Home = ({signOut, user}: WithAuthenticatorProps) => {  
  return (
    <div>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}
export default withAuthenticator(Home);