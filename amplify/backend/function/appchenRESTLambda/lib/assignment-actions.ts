import { createTextAssignment as createTextAssignmentQuery } from './graphql/mutations';
import { createTextAssignmentCourse as createTextAssignmentCourseQuery } from './graphql/mutations';
import { createTextAssignmentUser as createTextAssignmentUserQuery } from './graphql/mutations';
import { CreateTextAssignmentInput, CreateTextAssignmentCourseInput, CreateTextAssignmentUserInput, UpdateTextAssignmentInput, UpdateTextAssignmentUserInput, Level } from './graphql/GraphQL'
import { deleteTextAssignment as deleteTextAssignmentQuery } from './graphql/mutations';
import { deleteTextAssignmentCourse as deleteTextAssignmentQueryCourse } from './graphql/mutations';
import { updateTextAssignment as updateTextAssignmentQuery } from './graphql/mutations';
import { updateTextAssignmentUser as updateTextAssignmentUserQuery } from './graphql/mutations';
import { getTextAssignmentUserTimeLimits as getTextAssignmentUserTimeLimitsQuery } from './graphql/customQueries';
import { DeleteTextAssignmentInput, ModelTextAssignmentConditionInput, DeleteTextAssignmentCourseInput, ModelTextAssignmentUserConditionInput } from './graphql/GraphQL';
import { GetTextAssignmentUserTimeLimitsQuery } from './graphql/GraphQL';
import { graphQlRequest } from './utils';
import { getCourse } from './course-actions';
import { addAwsTimeToISODateString, awsTimeToMilliseconds } from './utils'

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
    throw error
  });  

  return body
}

export const startTextAssignmentUser = async (userAssignmentId: string, userId: string) => {
  console.log(new Date().toISOString().slice(11, -1))  

  const response = await graphQlRequest(getTextAssignmentUserTimeLimitsQuery, { id: userAssignmentId }).catch((error) => {
    throw error
  })

  const data = response.data as GetTextAssignmentUserTimeLimitsQuery

  let timeLimit = data?.getTextAssignmentUser?.textAssignmentCourse?.timeLimit

  if(timeLimit == null) {
    timeLimit = data?.getTextAssignmentUser.textAssignment.timeLimit
  }

  const now = new Date()

  const endTimeString = addAwsTimeToISODateString(now.toISOString(), timeLimit)
  
  const input: UpdateTextAssignmentUserInput = {
    id: userAssignmentId,
    startTime: now.toISOString(),
    endTime: endTimeString
  }

  const condition: ModelTextAssignmentUserConditionInput = {
    startTime: {
      attributeExists: false
    },
    userId: {
      eq: userId
    }
  }

  const variables = { input, condition };

	const body = await graphQlRequest(updateTextAssignmentUserQuery, variables).catch((error) => {
    throw error
  });  

  return body
}

export const submitTextAssignmentUser = async (userAssignmentId: string, userId: string, text: string) => {
  const ALLOWED_TIME_DELAY = 60 * 1000
  
  const input: UpdateTextAssignmentUserInput = {
    id: userAssignmentId,
    submission: text
  }

  const nowTime = new Date(new Date().getTime() - ALLOWED_TIME_DELAY).toISOString()

  console.log("Now Time:", nowTime)

  const condition: ModelTextAssignmentUserConditionInput = {
    and: [
      {
        endTime: {
          ge: nowTime
        }
      },
      {
        userId: {
          eq: userId
        },
      }
    ],    
  }

  const variables = { input, condition };

	const body = await graphQlRequest(updateTextAssignmentUserQuery, variables).catch((error) => {
    throw error
  });  

  return body
}