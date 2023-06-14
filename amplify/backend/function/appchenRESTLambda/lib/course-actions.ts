import { createCourse as createCourseQuery, deleteCourse as deleteCourseQuery } from './graphql/mutations';
import { createCoursesUsers as createCoursesUsersQuery } from './graphql/mutations';
import { getCourse as getCourseQuery } from './graphql/queries';
import { getUser as getUserQuery } from './graphql/queries';
import { deleteCoursesUsers as deleteCoursesUsersQuery } from './graphql/mutations';
import { updateCourse as updateCourseQuery } from './graphql/mutations';
import { getCourseOwnerIdQuery } from './graphql/customQueries';

import { ModelCourseConditionInput, UpdateCourseInput, GetCourseQuery } from './graphql/GraphQL'

import { createTextAssignmentUser } from './assignment-actions';

import crypto from 'crypto';

import { graphQlRequest } from './utils';

import { SSM } from 'aws-sdk';

let secretsInitialized = false;

interface Secrets {
  JWT_PRIVATE_KEY: string,
}

let secrets: Secrets = {
  JWT_PRIVATE_KEY: "",
}

const getSecrets = async () => {
  const keys = Object.keys(secrets);
  const { Parameters } = await (new SSM())
  .getParameters({
    Names: keys.map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();
  
  keys.forEach(key => {
    secrets[key] = Parameters.find(parameter => parameter.Name === process.env[key]).Value;
  })

  secretsInitialized = true;
}

export const createCourse = async (courseName: string, courseLevel: string, userName: string, ownerId: string, startDate: string, endDate: string) => {

  const variables = {
    input: {
      name: courseName,
      level: courseLevel,
      ownerId: ownerId,
      startDate: startDate,
      endDate: endDate,
      ownerName: userName
    }
  };

	const body = await graphQlRequest(createCourseQuery, variables).catch((error) => {
    throw error
  });  

  return body
}

export const getUser = async (userId: string) => {
  const variables = {
    id: userId
  };

  const body = await graphQlRequest(getUserQuery, variables).catch((error) => {
    throw error
  });  

  return body.data.getUser
}

export const getCourseOwnerId = async (courseId: string) => {
  const course = await graphQlRequest(getCourseOwnerIdQuery, { id: courseId }).catch((error) => {
    throw error
  });

  return course.data.getCourse.ownerId
}

export const leaveCourse = async (userId: string, courseId: string) => {

  const ownerId = await getCourseOwnerId(courseId).catch((error) => {
    throw error
  });

  if(ownerId === userId) {
    throw new Error("Course owner cannot leave course")
  }

  const variables = {
    input: {
      id: `${userId}_${courseId}`,
    }
  };

  const body = await graphQlRequest(deleteCoursesUsersQuery, variables).catch((error) => {
    throw error
  });  

  return body
}

export const joinUserToCourse = async (userId: string, courseId: string) => {  

  // Combining the user id and course id to prevent duplicate relational entries (user can only join a course once)
  const variables = {
    input: {
      id: `${userId}_${courseId}`,
      userId,
      courseId
    }
  };

  const body = await graphQlRequest(createCoursesUsersQuery, variables).catch((error) => {
    throw error
  }); 

  return body	
}

export const getCourse = async (courseId: string): Promise<GetCourseQuery["getCourse"]> => {
  const courseQueryVariables = { id: courseId }
	
  const getCourseBody = await graphQlRequest(getCourseQuery, courseQueryVariables).catch((error) => {
    throw error
  })

  return getCourseBody.data.getCourse as GetCourseQuery["getCourse"]
}

export const deleteCourse = async (courseId: string, userId: string) => {

  const course = await getCourse(courseId).catch((error) => { 
    throw error
  })

  await Promise.all(course.users.items.map(async (element) => {
    const deleteCoursesUsersVariables = {
      input: {
        id: element.id,
      }
    };
    await graphQlRequest(deleteCoursesUsersQuery, deleteCoursesUsersVariables)
  })).catch((error) => {
    throw error
  })  

  const deleteCourseVariables = {
    input: {
      id: courseId,
    }
  };  

  await graphQlRequest(deleteCourseQuery, deleteCourseVariables).catch((error) => {
    throw error
  })

  return { success: "Deleted Course", courseId: courseId}
}

export const setInviteToken = async (courseId: string, token: string, userId: string) => {
  const condition: ModelCourseConditionInput = {
    ownerId: {
      eq: userId
    }
  }

  const input: UpdateCourseInput = {
    id: courseId,
    inviteToken: token
  }

  const response = await graphQlRequest(updateCourseQuery, { input, condition }).catch((error) => {
    throw error
  })

  return token
}

export const createInviteLink = async (courseId: string, userId: string) => {  

  const token = crypto.randomBytes(10).toString('hex')  
  await setInviteToken(courseId, token, userId).catch((error) => {
    throw error
  })

  return token
}

export const invalidateInviteLink = async (courseId: string, userId: string) => {
  const token = await setInviteToken(courseId, "", userId).catch((error) => {
    throw error
  })
  return token
}

export const joinCourseWithToken = async (userId: string, courseId: string, token: string) => {

  const course = await getCourse(courseId).catch((error) => {
    throw error
  })
  console.log("Get Course", course)
  if(!course.inviteToken || course.inviteToken === "") {
    throw new Error("Course does not have an invite token")
  }
  if(course.inviteToken !== token) {
    throw new Error("Invalid Token")
  }

  const response = await joinUserToCourse(userId, courseId)
  console.log("Joining Course", response)
  const promises = await Promise.all(course.textAssignments?.items?.map(async (textAssignment) => {
    console.log("Text Assignment User", userId, textAssignment.id, textAssignment.textAssignmentId)
    await createTextAssignmentUser(userId, textAssignment.id, textAssignment.textAssignmentId)
  })).catch((error) => {
    throw error
  })  

  console.log("Text Assignment User", promises)
}