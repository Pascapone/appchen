import { restApiAction } from './utils'
import { graphQlQuery } from './utils';
import { listTextAssignments } from '@/graphql/queries';
import { Level } from '@/GraphQL';

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

  async creatTextAssignmentCourse(courseId: string, textAssignmentId: string, dueDate: string) {
    const body= {
      courseId,
      textAssignmentId,
      dueDate,
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

  async getTextAssignments(){
    const response = await graphQlQuery(listTextAssignments, {})
    return response.data.listTextAssignments.items
  }

  async deleteTextAssignment(assignmentId: string) {
    const body = {
      assignmentId,
    }
    return await restApiAction('/assignment/text-assignment', body, 'DELETE')
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
}
