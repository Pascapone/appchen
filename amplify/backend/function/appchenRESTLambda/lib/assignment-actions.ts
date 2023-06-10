import { createTextAssignment as createTextAssignmentQuery } from './graphql/mutations';
import { createTextAssignmentCourse as createTextAssignmentCourseQuery } from './graphql/mutations';
import { createTextAssignmentUser as createTextAssignmentUserQuery } from './graphql/mutations';
import { CreateTextAssignmentInput, CreateTextAssignmentCourseInput, CreateTextAssignmentUserInput, UpdateTextAssignmentInput, Level } from './graphql/GraphQL'
import { deleteTextAssignment as deleteTextAssignmentQuery } from './graphql/mutations';
import { updateTextAssignment as updateTextAssignmentQuery } from './graphql/mutations';
import { DeleteTextAssignmentInput, ModelTextAssignmentConditionInput } from './graphql/GraphQL';
import { graphQlRequest } from './utils';

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

export const createTextAssignmentCourse = async (courseId: string, textAssignmentId: string, dueDate: string) => {

  const input: CreateTextAssignmentCourseInput = {
    textAssignmentId: textAssignmentId,
    courseId: courseId,
    dueDate: dueDate,
  }

  const variables = { input };

	const body = await graphQlRequest(createTextAssignmentCourseQuery, variables).catch((error) => {
    throw error
  });  

  return body
}

export const createTextAssignmentUser = async (userId: string, textAssignmentCourseId: string, textAssignmentId: string) => {

  const input: CreateTextAssignmentUserInput = {
    userId,
    textAssignmentId,
    textAssignmentCourseId,
  }

  const variables = { input };

	const body = await graphQlRequest(createTextAssignmentUserQuery, variables).catch((error) => {
    throw error
  });  

  return body
}