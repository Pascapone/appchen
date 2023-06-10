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
    case 'PUT':
      return await API.put(apiName, path, myInit);
  }
}

export const graphQlQuery = async (query: any, variables: any): Promise<GraphQLResult<any>> => {
  const model = await API.graphql<GraphQLQuery<any>>(
    graphqlOperation(query, variables)
  );  
  
  return model
}