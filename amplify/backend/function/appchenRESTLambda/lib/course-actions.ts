import { createCourse as createCourseQuery, deleteCourse as deleteCourseQuery } from './graphql/mutations';
import { createCoursesUsers as createCoursesUsersQuery } from './graphql/mutations';
import { getCourse as getCourseQuery } from './graphql/queries';
import { getUser as getUserQuery } from './graphql/queries';
import { deleteCoursesUsers as deleteCoursesUsersQuery } from './graphql/mutations';
import { updateCourse as updateCourseQuery } from './graphql/mutations';
import { getCourseOwnerIdQuery } from './graphql/customQueries';

import jwt from 'jsonwebtoken'; 

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
    console.log("Create Course Promise Error:", error)
    throw error
  });  

  return body
}

export const getUser = async (userId: string) => {
  const variables = {
    id: userId
  };

  const body = await graphQlRequest(getUserQuery, variables).catch((error) => {
    console.log("Get Course Promise Error:", error)
    throw error
  });  

  return body.data.getUser
}

export const getCourseOwnerId = async (courseId: string) => {
  const course = await graphQlRequest(getCourseOwnerIdQuery, { id: courseId }).catch((error) => {
    console.log("Get Course Owner Id Promise Error:", error)
    throw error
  });

  return course.data.getCourse.ownerId
}

export const leaveCourse = async (userId: string, courseId: string) => {

  console.group("Get Course Owner Id")
  const ownerId = await getCourseOwnerId(courseId).catch((error) => {
    console.log("Get Course Owner Id Promise Error:", error)
    throw error
  });

  console.log("Owner Id:", ownerId)
  if(ownerId === userId) {
    throw new Error("Course owner cannot leave course")
  }

  const variables = {
    input: {
      id: `${userId}_${courseId}`,
    }
  };

  const body = await graphQlRequest(deleteCoursesUsersQuery, variables).catch((error) => {
    console.log("Delete Course User Relation Promise Error:", error)
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
    console.log("Create Course Promise Error:", error)
    throw error
  }); 

  return body	
}

export const getCourse = async (courseId: string) => {
  const courseQueryVariables = { id: courseId }
	
  const getCourseBody = await graphQlRequest(getCourseQuery, courseQueryVariables).catch((error) => {
    console.log("Get Course Promise Error:", error)
    throw error
  })

  return getCourseBody.data.getCourse
}

export const deleteCourse = async (courseId: string, userId: string) => {

  const course = await getCourse(courseId).catch((error) => { 
    console.log("Get Course Promise Error:", error)
    throw error
  })

  console.log("Course:", course)
  console.log("Course Users:", course.users.items)

  await Promise.all(course.users.items .map(async (element) => {
    const deleteCoursesUsersVariables = {
      input: {
        id: element.id,
      }
    };
    await graphQlRequest(deleteCoursesUsersQuery, deleteCoursesUsersVariables)
  })).catch((error) => {
    console.log("Delete Course Promise Error:", error)
    throw error
  })  

  console.log("Course Id:", course.id)

  const deleteCourseVariables = {
    input: {
      id: courseId,
    }
  };  

  await graphQlRequest(deleteCourseQuery, deleteCourseVariables).catch((error) => {
    console.log("Delete Course Promise Error:", error)
    throw error
  })

  return { success: "Deleted Course", courseId: courseId}
}

export const createInviteLink = async (courseId: string) => {

  if(!secretsInitialized) {
    await getSecrets()
  }

  const course = await getCourse(courseId).catch((error) => {
    console.log("Get Course Promise Error:", error)
    throw error
  })

  const token = jwt.sign({ 
    courseId,
    courseName: course.name,
    courseLevel: course.level,
    courseStartDate: course.startDate,
    courseEndDate: course.endDate,
    courseOwnerName: course.ownerName,
   }, secrets.JWT_PRIVATE_KEY);

  const response = await graphQlRequest(updateCourseQuery, { 
    input: {
      id: courseId,
      inviteToken: token
    }
  }).catch((error) => {
    console.log("Get Course Promise Error:", error)
    throw error
  })

  console.log("Response Update", response)

  console.log("JWT Private Key", secrets.JWT_PRIVATE_KEY)
  console.log("Secrets", secrets)
  return token
}

export const joinCourseWithToken = async (userId: string, token: string) => {
  if(!secretsInitialized) {
    await getSecrets()
  }

  const valid = jwt.verify(token, secrets.JWT_PRIVATE_KEY);

  if(!valid) {
    throw new Error("Invalid Token")
  }

  const payload = jwt.decode(token);  
  if(payload !== null && typeof payload === 'object') {  

    const course = await getCourse(payload.courseId)
    console.log("Course", course)
    console.log("Invite Token", course.inviteToken)
    if(course.inviteToken !== token) {
      throw new Error("Invalid Token")
    }
    await joinUserToCourse(userId, payload.courseId)
  }
  else{
    throw new Error("Error Decoding Token")
  }
  
}