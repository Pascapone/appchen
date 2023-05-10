"use client"

import { API, Auth } from 'aws-amplify'
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'

 const Home = ({signOut, user}: WithAuthenticatorProps) => {  

  async function handleCheckAPI() { 
    let apiName = 'appchenREST';
    let path = '/';
    let myInit = {        
        headers: {
          'Content-Type' : 'application/json',
          Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        } 
    }
    return await API.get(apiName, path, myInit);
  }

  return (
    <div>
      <button onClick={signOut}>Sign out</button>
      <button onClick={handleCheckAPI}>Test API</button>
    </div>
  )
}
export default withAuthenticator(Home);