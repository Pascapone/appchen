import { API, Auth, graphqlOperation } from 'aws-amplify'
import { GraphQLQuery } from '@aws-amplify/api';

import {GraphQLResult} from '@aws-amplify/api-graphql';

import { UpdateCourseMutation } from '@/GraphQL';
import { updateCourse as updateCourseQuery } from '@/graphql/mutations';

import { ModelCourseConditionInput, UpdateCourseInput } from '@/GraphQL';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'

export const restApiAction = async (route: string, body: any, method: Method) => {
  let apiName = 'appchenREST';
  let path = route;
  let myInit = {        
    headers: {
      'Content-Type' : 'application/json',
      Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    },
    body
  }

  switch(method) {
    case 'GET':
      return await API.get(apiName, path, myInit);
    case 'POST':
      return await API.post(apiName, path, myInit);
    case 'DELETE':
      return await API.del(apiName, path, myInit);
  }
}

export const graphQlQuery = async (query: any, variables: any): Promise<GraphQLResult<any>> => {
  const model = await API.graphql<GraphQLQuery<any>>(
    graphqlOperation(query, variables)
  );  
  
  return model
}


// ------------------- Course API ------------------- //
// Is just a test function, delete it later
// Test passed -> Conditional update works
export const updateTest = async (courseId: string, userId: string) => {
 
  const input: UpdateCourseInput = {
    id: courseId,
    inviteToken: 'Real Test'
  };

  const condition: ModelCourseConditionInput = {
    ownerId: {
      eq: "4d8de7e8-f672-4fe4-b0ce-bf9fff1c21b7"
    }
  }
  
  const updatedCourse = await API.graphql<GraphQLQuery<UpdateCourseMutation>>({ 
    query: updateCourseQuery, 
    variables: { input, condition },

  });

  return updatedCourse
}