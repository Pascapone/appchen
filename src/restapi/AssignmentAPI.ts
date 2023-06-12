import { restApiAction } from './utils'
import { graphQlQuery } from './utils';
import { listTextAssignments } from '@/graphql/queries';
import { getUserAssignments as getUserAssignmentsQuery } from '@/graphql/customQueries';
import { Level } from '@/GraphQL';
import { ModelTextAssignmentFilterInput } from '@/GraphQL';

export class AssignmentAPI {
  async creatTextAssignment(name: string, courseLevel: Level, description: string, link: string, timeLimit: string) {
    const body= {
      name: name,
      level: courseLevel,
      description: description,
      link: link,
      timeLimit: timeLimit
    }
    return await restApiAction('/assignment/text-assignment', body, 'POST')
  }

  async creatTextAssignmentCourse(courseId: string, textAssignmentId: string, timeLimit: string, dueDate?: string) {
    
    let body: any = {
      courseId,
      textAssignmentId,
      timeLimit
    }

    if (dueDate !== undefined) {
      body["dueDate"] = dueDate
    }

    return await restApiAction('/assignment/text-assignment-course', body, 'POST')
  }

  async creatTextAssignmentUser(textAssignmentId: string, textAssignmentCourseId: string) {
    const body = {
      textAssignmentCourseId,
      textAssignmentId,
    }
    return await restApiAction('/assignment/text-assignment-user', body, 'POST')
  }

  async getTextAssignments(filter?: ModelTextAssignmentFilterInput){
    const variables = filter === undefined ? {} : { filter }

    const response = await graphQlQuery(listTextAssignments, variables)
    return response.data.listTextAssignments.items
  }

  async deleteTextAssignment(assignmentId: string) {
    const body = {
      assignmentId,
    }
    return await restApiAction('/assignment/text-assignment', body, 'DELETE')
  }

  async deleteTextAssignmentCourse(assignmentId: string) {
    const body = {
      assignmentId,
    }
    return await restApiAction('/assignment/text-assignment-course', body, 'DELETE')
  }

  async updateTextAssignment(assignmentId: string, name: string, level: Level, description: string, link: string, timeLimit: string) {
    const body = {
      assignmentId,
      name,
      level,
      description,
      link,
      timeLimit,
    }
    return await restApiAction('/assignment/text-assignment', body, 'PUT')
  }

  async getUserWithAssignments(userId: string){
    const variables = { id: userId }

    const response = await graphQlQuery(getUserAssignmentsQuery, variables)
    return response.data.getUser
  }
}
