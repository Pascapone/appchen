import { createCourse as createCourseQuery, deleteCourse as deleteCourseQuery } from './graphql/mutations';
import { createCoursesUsers as createCoursesUsersQuery } from './graphql/mutations';
import { getCourse as getCourseQuery } from './graphql/queries';
import { getUser as getUserQuery } from './graphql/queries';
import { deleteCoursesUsers as deleteCoursesUsersQuery } from './graphql/mutations';
import { getCourseOwnerIdQuery } from './graphql/customQueries';

import { graphQlRequest } from './utils';

export const createCourse = async (name: string, level: string, ownerId: string, startDate: string, endDate: string) => {
  
  const variables = {
    input: {
      name: name,
      level: level,
      ownerId: ownerId,
      startDate: startDate,
      endDate: endDate
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