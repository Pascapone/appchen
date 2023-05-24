import { API, Auth, graphqlOperation } from 'aws-amplify'
import { GraphQLQuery } from '@aws-amplify/api';

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

export const graphQlQuery = async (query: any, variables: any) => {
  const model = await API.graphql<GraphQLQuery<any>>(
    graphqlOperation(query, variables)
  );  
  
  return model
}