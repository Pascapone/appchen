import { createTextAssignment as createTextAssignmentQuery } from './graphql/mutations';
import { createTextAssignmentCourse as createTextAssignmentCourseQuery } from './graphql/mutations';
import { createTextAssignmentUser as createTextAssignmentUserQuery } from './graphql/mutations';
import { CreateTextAssignmentInput, CreateTextAssignmentCourseInput, CreateTextAssignmentUserInput, UpdateTextAssignmentInput, Level } from './graphql/GraphQL'
import { deleteTextAssignment as deleteTextAssignmentQuery } from './graphql/mutations';
import { deleteTextAssignmentCourse as deleteTextAssignmentQueryCourse } from './graphql/mutations';
import { updateTextAssignment as updateTextAssignmentQuery } from './graphql/mutations';
import { DeleteTextAssignmentInput, ModelTextAssignmentConditionInput, DeleteTextAssignmentCourseInput } from './graphql/GraphQL';
import { graphQlRequest } from './utils';
import { getCourse } from './course-actions';

export const createTextAssignment = async (name: string, courseLevel: Level, description: string, link: string, timeLimit: string, userId: string) => {

  console.log("Time Limit:", timeLimit)
  console.log(timeLimit.length)
  if(timeLimit.length !== 12) throw new Error("Time limit must be in format HH:mm:ss.SSS")

  const input: CreateTextAssignmentInput = {
    ownerId: userId,
    name: name,
    level: courseLevel,
    description: description,
    link: link,
    timeLimit: timeLimit,    
  }

  const variables = { input };

	const body = await graphQlRequest(createTextAssignmentQuery, variables).catch((error) => {
    throw error
  });  

  return body
}

export const updateTextAssignment = async (assignmentId: string, name: string, courseLevel: Level, description: string, link: string, timeLimit: string, userId: string) => {

  if(timeLimit.length !== 12) throw new Error("Time limit must be in format HH:mm:ss.SSS")

  const input: UpdateTextAssignmentInput = {
    id: assignmentId,
    name: name,
    level: courseLevel,
    description: description,
    link: link,
    timeLimit: timeLimit,    
  }

  const condition: ModelTextAssignmentConditionInput = {
    ownerId: {
      eq: userId
    }
  }

  const variables = { input, condition };

	const body = await graphQlRequest(updateTextAssignmentQuery, variables).catch((error) => {
    throw error
  });  

  return body
}

export const deleteTextAssignment = async (assignmentId: string, userId: string) => {

  const input: DeleteTextAssignmentInput = {
    id: assignmentId,  
  }

  const condition: ModelTextAssignmentConditionInput = {
    ownerId: {
      eq: userId
    }
  }

  const variables = { input, condition };

	const body = await graphQlRequest(deleteTextAssignmentQuery, variables).catch((error) => {
    throw error
  });  

  return body
}

export const createTextAssignmentCourse = async (courseId: string, textAssignmentId: string, timeLimit: string, dueDate: string | null) => { 
 
  const input: CreateTextAssignmentCourseInput = {
    textAssignmentId,
    courseId,
    timeLimit
  }

  if(dueDate != null) input['dueDate'] = dueDate
  const variables = { input };

	const body = await graphQlRequest(createTextAssignmentCourseQuery, variables).catch((error) => {
    throw error
  });  

  const courseAssignment = body.data.createTextAssignmentCourse

  console.log("Create Text Assignment Course Body", body)

  const course = await getCourse(courseId).catch((error) => {
    throw error
  });

  console.log("Course Model", course)

  console.log("Users:", course.users.items)

  const response = await Promise.all(course.users.items.map(async (user) => {
    console.log("User:", user)
    await createTextAssignmentUser(user.userId, courseAssignment.id, textAssignmentId).catch((error) => {
      throw error
    });
  }))

  return body
}

export const deleteTextAssignmentCourse = async (assignmentId: string) => {

  const input: DeleteTextAssignmentCourseInput = {
    id: assignmentId,  
  }

  const variables = { input };

	const body = await graphQlRequest(deleteTextAssignmentQueryCourse, variables).catch((error) => {
    throw error
  });  

  return body
}

export const createTextAssignmentUser = async (userId: string, textAssignmentCourseId: string, textAssignmentId: string) => {

  const input: CreateTextAssignmentUserInput = {
    userId,
    textAssignmentCourseId,
    textAssignmentId,
  }

  const variables = { input };

	const body = await graphQlRequest(createTextAssignmentUserQuery, variables).catch((error) => {
    console.log("Error in Create Text User:", error)
    throw error
  });  

  return body
}