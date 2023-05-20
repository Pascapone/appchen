"use client"

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react'
import { GraphQLQuery } from '@aws-amplify/api';
import { getUser } from '@/graphql/queries';
import { GetUserQuery } from '@/GraphQL';
import { Level } from '@/GraphQL';
import { use } from 'react';


const testQuery = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      userType
      courses {
        items {
          id
          userId
          courseId          
          course {
            id
            name
            level
          }
        }
        nextToken
      }
    }
  }
`;

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

  async function createCourseQuery() { 
    let apiName = 'appchenREST';
    let path = '/course/create';
    let myInit = {        
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      },
      body: {
        "name": "0107b",
        "level": Level.B11
      }
    }
    const response = await API.post(apiName, path, myInit);
    console.log('response', response)
  }

  async function joinGroupQuery(userId: string, courseId: string) { 
    let apiName = 'appchenREST';
    let path = '/course/join';
    let myInit = {        
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
      },
      body: {
        userId,
        courseId
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

  const debugFunction = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    console.log('cognitoUser', cognitoUser);
    console.log('user', user)
  }  // ...

  const handleCreateCourse = async () => {
    createCourseQuery()    
  }

  const handleGetUser = async () => {
    const userModel = await API.graphql<GraphQLQuery<GetUserQuery>>(
      graphqlOperation(testQuery, { id: user!.username })
    );    
    console.log('userModel', userModel)
  }

  const handleJoinGroup = async () => {
    if (user && user.username){
      joinGroupQuery(user?.username ,"479f4e1f-e61e-481c-9e7c-5600fb931c03")
    }
  }

  return (
    <div>
      <button onClick={signOut}>Sign out</button>
      <button onClick={refreshSession}>Refresh Token</button>
      <button onClick={handleCheckAPI}>Test API</button>
      <button onClick={debugFunction}>Debug</button>
      <button onClick={handleCreateCourse}>Create Course</button>
      <button onClick={handleJoinGroup}>Join Group</button>
      <button onClick={handleGetUser}>Get User</button>
    </div>
  )
}
export default withAuthenticator(Home);