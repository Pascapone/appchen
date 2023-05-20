import { Level } from '@/GraphQL';
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { GraphQLQuery } from '@aws-amplify/api';
import { userCourseQuery } from '@/graphql/customQueries';


export async function createJoinCourse(courseName: string, level: Level, userId: string) {
  let apiName = 'appchenREST';
  let path = '/course/create-and-join';
  let myInit = {        
    headers: {
      'Content-Type' : 'application/json',
      Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
    },
    body: {
      "name": courseName,
      "level": level,
      "userId": userId
    }
  }
  return await API.post(apiName, path, myInit);
}

// Type any should be replaced with the type of the course object (see GraphQL schema)
export async function getUserCourses(userId: string) {
  const userModel = await API.graphql<GraphQLQuery<any>>(
    graphqlOperation(userCourseQuery, { id: userId })
  );   

  if(!userModel.data?.getUser?.courses?.items) {
    return null
  }

  const courses = userModel.data.getUser.courses.items.map((item: any) => item.course)

  return courses
}