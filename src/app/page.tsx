"use client"

import { API, Auth } from 'aws-amplify'
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import { Level } from '@/GraphQL';
 const Home = ({signOut, user}: WithAuthenticatorProps) => {  

  async function handleCheckAPI() { 
    let apiName = 'appchenREST';
    let path = '/course/create';
    let myInit = {        
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      },
      body: {
        "name": "test",
        "level": Level.B11
      }
    }
    return await API.post(apiName, path, myInit);
  }

  const refreshSession = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      cognitoUser.refreshSession(currentSession.getRefreshToken(), (err: string, session: any) => {
        console.log('session', err);   
      });
    } catch (e) {
      console.log('Unable to refresh Token', e);
    }
  }

  return (
    <div>
      <button onClick={signOut}>Sign out</button>
      <button onClick={refreshSession}>Refresh Token</button>
      <button onClick={handleCheckAPI}>Test API</button>
    </div>
  )
}
export default withAuthenticator(Home);