import { restApiAction } from './utils'
import { graphQlQuery } from './utils';
import { Level } from '@/GraphQL';
import { getCourse as getCourseQuery } from '@/graphql/queries';
import { userCourseQuery } from '@/graphql/customQueries';

export class CourseAPI {
  async createJoinCourse(courseName: string, level: Level, startDate: Date, endDate: Date) {
    console.log("Start ISO Date", startDate.toISOString())
    console.log("End ISO Date", endDate.toISOString())
    const body= {
      name: courseName,
      level: level,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }
    return await restApiAction('/course/create-and-join', body, 'POST')
  }

  // Type any should be replaced with the type of the course object (see GraphQL schema)
  async getUserCourses(userId: string) {
    console.log("User ID", userId)
    const model = await graphQlQuery(userCourseQuery, { id: userId })

    console.log("User Model", model)

    if(!model.data?.getUser?.courses?.items) {
      return []
    }  
    const courses = model.data.getUser.courses.items.map((item: any) => item.course)

    return courses
  }

  async joinUserToCourse(userId: string, courseId: string) {
    const body= {
      userId: userId,
      courseId: courseId,
    }
  
    return await restApiAction('/course/join', body, 'POST')
  }

  // Type any should be replaced with the type of the course object (see GraphQL schema)
  async getCourse(courseId: string) {
    const model = await graphQlQuery(getCourseQuery, { id: courseId })
    return model
  }

  async  leaveCourse(courseId: string) {
    const body= {
      courseId: courseId,
    }
  
    return await restApiAction('/course/leave', body, 'POST') 
  }

  async deleteCourse(courseId: string) {
    const body= {}
    console.log("Course Id Delete", courseId)
    return await restApiAction(`/course/${courseId}`, body, 'DELETE')
  }
}
